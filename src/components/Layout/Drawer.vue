<template>
  <q-drawer
    v-if="isLoggedIn && $route.path != '/auth'"
    show-if-above
    :mini="miniState"
    @mouseover="miniState = false"
    @mouseout="miniState = true"
    mini-to-overlay
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
</template>
<script>
import navs from "../../router/navs";
import { mapGetters } from "vuex";
export default {
  name: "Drawer",
  data() {
    return {
      navs: navs,
      miniState: true,
      leftDrawerOpen: false
    };
  },
  computed: {
    ...mapGetters("auth", ["isLoggedIn"])
  }
};
</script>
