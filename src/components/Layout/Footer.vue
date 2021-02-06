<template>
  <q-footer v-if="isLoggedIn && $route.path != '/auth'">
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
        <q-item-section avatar>
          <q-icon :name="nav.icon" />
        </q-item-section>
        <q-tooltip>{{ $t(nav.label) }}</q-tooltip>
      </q-item>
    </q-tabs>
  </q-footer>
</template>
<script>
import navs from "../../router/navs";
import { mapGetters } from "vuex";
export default {
  name: "Footer",
  data() {
    return {
      navs: navs
    };
  },
  computed: {
    ...mapGetters("auth", ["isLoggedIn"])
  }
};
</script>
