<template>
  <q-toolbar style="height: 58px" class="bg-primary text-white">
    <!-- Menu Button -->
    <!-- <q-btn
      v-if="isLoggedIn && $route.path != '/auth' && $q.screen.gt.sm"
      flat
      dense
      round
      @click="leftDrawerOpen = !leftDrawerOpen"
      icon="menu"
      aria-label="Menu"
    /> -->

    <q-toolbar-title v-if="$q.screen.gt.sm" shrink class="q-ml-sm">
      AIACTIVE Technologies
    </q-toolbar-title>

    <q-btn flat class="">
      <q-icon name="search" @click="show = !show" />
    </q-btn>

    <q-input
      show-if-above
      :width="200"
      class="  GPL__toolbar-input "
      v-if="show"
      dense
      color="orange"
      standout
      clearable
      placeholder="Search"
      v-model="search"
    >
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
          <q-list style="min-width: 100px">
            <q-item aria-hidden="true">
              <!-- List Header -->
              <q-item-section
                class="text-uppercase text-grey-7"
                style="font-size: 0.7rem"
                >Account</q-item-section
              >
            </q-item>
            <q-toggle
              class="q-px-md"
              v-model="darkMode"
              label="Dark Mode"
              left-label
            />

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
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Toolbar",
  data() {
    return {
      show: true,
      search: "",
      darkMode: false,
      accountMenu: [
        { icon: "settings", text: "Settings", clickAction: "/settings" },
        { icon: "logout", text: "Logout", clickAction: "logout" }
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
  },
  watch: {
    darkMode: function() {
      this.$q.dark.set(this.darkMode);
      localStorage.setItem("DarkMode", this.darkMode);
    }
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
<style lang="scss">
.slide-fade-enter-active {
  transition: all 0.6s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
</style>
