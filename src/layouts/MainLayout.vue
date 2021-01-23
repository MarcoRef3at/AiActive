<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- Menu Button -->
        <q-btn
          v-if="isLoggedIn && $route.path != '/auth'"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <!-- Login  Button -->
        <q-btn
          v-if="!isLoggedIn && $route.path != '/auth'"
          to="/auth"
          flat
          icon-right="account_circle"
          label="Login"
          class="absolute-right"
        />

        <!-- logout  Button -->
        <q-btn
          v-else-if="$route.path != '/auth'"
          @click="showLogoutModal"
          flat
          icon-right="logout"
          label="Logout"
          class="absolute-right"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="isLoggedIn && $route.path != '/auth'"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import EssentialLink from "components/EssentialLink.vue";

const linksData = [
  {
    title: "Home",
    icon: "home",
    link: "/"
  },
  {
    title: "Settings",
    icon: "settings",
    link: "/Settings"
  },
  {
    title: "users",
    icon: "users",
    link: "/users"
  },
  {
    title: "lpr",
    icon: "lpr",
    link: "/lpr"
  }
];

export default {
  name: "MainLayout",
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
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
    }
  },

  computed: {
    ...mapGetters("auth", ["isLoggedIn"])
  }
};
</script>
