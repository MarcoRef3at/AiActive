<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar style="height: 58px">
        <!-- Menu Button -->
        <q-btn
          v-if="isLoggedIn && $route.path != '/auth' && $q.screen.gt.sm"
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title v-if="$q.screen.gt.sm" shrink class="q-ml-sm">
          AIACTIVE Technologies
        </q-toolbar-title>

        <q-input
          class=" absolute-center GPL__toolbar-input "
          dense
          color="orange"
          standout
          clearable
          v-model="search"
          placeholder="Search"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-space />
        <div>
          <!-- Login  Button -->
          <q-btn
            v-if="!isLoggedIn && $route.path != '/auth'"
            to="/auth"
            flat
            icon-right="account_circle"
            label="Login"
            class="absolute-right"
          />

          <!-- LoggedIn Avatar -->
          <q-btn v-else-if="$route.path != '/auth'" round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>

            <!-- DropDown List -->
            <q-menu>
              <q-list class="text-grey-8" style="min-width: 100px">
                <q-item aria-hidden="true">
                  <!-- List Header -->
                  <q-item-section
                    class="text-uppercase text-grey-7"
                    style="font-size: 0.7rem"
                    >Account</q-item-section
                  >
                </q-item>

                <!-- List Items -->
                <q-item
                  v-for="menu in accountMenu"
                  :key="menu.text"
                  clickable
                  @click="menuActionClick(menu.clickAction)"
                  v-close-popup
                  aria-hidden="true"
                >
                  <!-- List Items Icon -->
                  <q-item-section avatar>
                    <q-icon :name="menu.icon" />
                  </q-item-section>

                  <!-- List Items Label -->
                  <q-item-section>{{ menu.text }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <!-- Mobile Footer -->
    <q-footer v-if="!$q.screen.gt.sm">
      <q-tabs>
        <q-item
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          exact
          clickable
          class="text-white"
          active-class="bg-primary-light-dimmed text-yellow-8"
        >
          <q-item-section avatar center>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-tooltip>{{ $t(nav.label) }}</q-tooltip>
        </q-item>
      </q-tabs>
    </q-footer>

    <q-drawer
      v-if="isLoggedIn && $route.path != '/auth' && $q.screen.gt.sm"
      v-model="leftDrawerOpen"
      show-if-above
      @click="leftDrawerOpen = false"
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      overlay
      content-class="bg-primary"
    >
      <q-scroll-area class="fit">
        <!-- Drawer Toolbar -->
        <q-toolbar style="height: 20px">
          <q-toolbar-title class="row items-center ">
            <!-- Logo Opened -->
            <img
              v-if="!miniState"
              class="q-pt-lg q-mx-md "
              src="~/assets/aiactive-logo.png"
              style="width:80%"
            />
            <!-- Logo Closed -->
            <q-avatar v-else size="30px" class="q-pt-md q-mb-md ">
              <img src="~/assets/Logo_2020.png" />
            </q-avatar>
          </q-toolbar-title>
        </q-toolbar>
        <q-list class="q-pt-lg">
          <q-item
            v-for="nav in navs"
            :key="nav.label"
            :to="nav.to"
            exact
            clickable
            class="text-white"
            active-class="bg-primary-light-dimmed text-yellow-7"
          >
            <q-item-section avatar>
              <q-icon :name="nav.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                {{ $t(nav.label) }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container :class="$q.screen.gt.sm ? 'q-pl-xl' : 'q-pb-xl'">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MainLayout",
  data() {
    return {
      miniState: true,
      search: "",
      leftDrawerOpen: false,
      accountMenu: [
        { icon: "settings", text: "Settings", clickAction: "/settings" },
        { icon: "logout", text: "Logout", clickAction: "logout" }
      ],
      navs: [
        {
          label: "Home",
          icon: "home",
          to: "/"
        },
        {
          label: "Settings",
          icon: "settings",
          to: "/Settings"
        },
        {
          label: "users",
          icon: "fas fa-users",
          to: "/users"
        },
        {
          label: "lpr",
          icon: "device_hub",
          to: "/lpr"
        }
      ]
    };
  },
  methods: {
    ...mapActions("auth", ["logoutUser"]),
    showLogoutModal() {
      this.$q
        .dialog({
          title: "Logout",
          message: "Are you sure you want to logout?",
          ok: "Logout",
          cancel: "Cancel"
        })
        .onOk(() => {
          this.logoutUser();
        });
    },
    menuActionClick(action) {
      if (action === "logout") {
        this.showLogoutModal();
      } else {
        this.$router.push(action);
      }
    }
  },

  computed: {
    ...mapGetters("auth", ["isLoggedIn"])
  }
};
</script>
<style lang="sass">
.GPL

  &__toolbar
    height: 40px

  &__toolbar-input
    width: 35%

  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px

    .q-item__section--avatar
      padding-left: 12px
      .q-icon
        color: #5f6368

    .q-item__label:not(.q-item__label--caption)
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem

    &--storage
      border-radius: 0
      margin-right: 0
      padding-top: 24px
      padding-bottom: 24px

  &__side-btn
    &__label
      font-size: 12px
      line-height: 24px
      letter-spacing: .01785714em
      font-weight: 500

  @media (min-width: 1024px)
    &__page-container
      padding-left: 94px
</style>
