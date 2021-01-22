<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          AiActive
        </q-toolbar-title>
        <!-- Login  Button -->
        <q-btn
          v-if="!loggedIn && $route.path != '/auth'"
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
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <auth-menu />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import AuthMenu from './auth/AuthMenu'
import { mapActions, mapGetters } from "vuex";
export default {
  name: 'MyLayout',
  components: {
    AuthMenu
  },
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    showLogoutModal(){
      this.$q.dialog({
      title: this.$i18n.t('auth.logout.confirm'),
      message: this.$i18n.t('auth.logout.logout_confirmation'),
      ok: this.$i18n.t('auth.logout.logout'),
      cancel: this.$i18n.t('auth.logout.cancel')
    }).onOk(() => {
      this.$auth.logout()
    })
    }
  },

  computed: {
    ...mapGetters("auth", ["loggedIn"])
  }
}
</script>
