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
          <q-select
            label="Select Language"
            v-model="lang"
            map-options
            :options="langOptions"
            bg-color="secondary"
            filled
            class="absolute-center"
            style="max-width: 150px"
          />
        </q-toolbar-title>
        <!-- <div>Quasar v{{ $q.version }}</div> -->
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
import languages from "quasar/lang/index.json";
const appLanguages = languages.filter(lang =>
  ["ar", "en-us"].includes(lang.isoName)
);
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
  },
  {
    title: "Toll Camera",
    caption: "Printing",
    icon: "camera",
    link: "/TollCamera"
  },
  {
    title: "Test",
    caption: "Test",
    icon: "camera",
    link: "/Test"
  }
];

export default {
  name: "MainLayout",
  components: { EssentialLink },
  data() {
    return {
      lang: this.$i18n.locale,
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
    ...mapState("auth", ["loggedIn"])
  },
  watch: {
    lang(lang) {
      this.$i18n.locale = lang.value;
      // set quasar's language too!!
      import(`quasar/lang/${lang.value}`).then(language => {
        this.$q.lang.set(language.default);
      });
    }
  },
  created() {
    this.langOptions = appLanguages.map(lang => ({
      label: lang.nativeName,
      value: lang.isoName
    }));
  }
};
</script>
