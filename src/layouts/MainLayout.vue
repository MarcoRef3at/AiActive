<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="loggedIn && $route.path != '/auth'"
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

        <q-btn
          v-if="!loggedIn && $route.path != '/auth'"
          to="/auth"
          flat
          icon-right="account_circle"
          label="Login"
          class="absolute-right"
        />

        <q-btn
          v-else-if="$route.path != '/auth'"
          @click="logoutUser"
          flat
          icon-right="logout"
          label="Logout"
          class="absolute-right"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="loggedIn && $route.path != '/auth'"
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
import { mapState, mapActions } from "vuex";
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
    ...mapActions("auth", ["logoutUser"])
  },

  computed: {
    ...mapState("auth", ["loggedIn"])
  }
};
</script>
