<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title>
          Quasar App
          <q-btn @click="isLogged" label="Token Decoder" color="secondary" />
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
        <q-btn
          v-if="!LoggedIn && $route.path != '/auth'"
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
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Menu
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
import EssentialLink from "components/EssentialLink.vue";
import { mapState, mapActions } from "vuex";
const linksData = [
  {
    title: "Dashboard",
    caption: "Printing",
    icon: "leaderboard",
    link: "/"
  },
  {
    title: "Reporting",
    caption: "Printing",
    icon: "report",
    link: "/Report"
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
    ...mapActions("auth", ["logoutUser", "isLoggedIn"]),
    isLogged() {
      this.isLoggedIn();
    }
  },

  computed: {
    ...mapState("auth", ["LoggedIn"])
  }
};
</script>
