<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated> </q-header>

    <TOOLBAR />
    <DRAWER v-if="$q.screen.gt.sm" />
    <FOOTER v-else />
    <q-page-container :class="$q.screen.gt.sm ? 'q-pl-xl' : 'q-pb-xl'">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import navs from "../router/navs";
import { colors } from "quasar";
export default {
  name: "MainLayout",
  data() {
    return {
      navs: navs,
      lang: localStorage.getItem("Language")
    };
  },

  components: {
    TOOLBAR: require("components/Layout/Toolbar").default,
    FOOTER: require("components/Layout/Footer").default,
    DRAWER: require("components/Layout/Drawer").default
  },
  mounted() {
    let ThemeColor = localStorage.getItem("ThemeColor");
    const { setBrand } = colors;
    if (ThemeColor != null) {
      setBrand("primary", ThemeColor);
    }
  }
};
</script>
