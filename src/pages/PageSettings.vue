<template>
  <!-- todo: conditional render according to permission (v-if) -->
  <q-page class="flex flex-center">
    <div>{{ userData.role }}</div>
    <Users />
  </q-page>
</template>

<script>
import Users from "src/components/Settings/UsersSettings/UsersSettings";
// import routes from '../router/r'
import { mapState, mapActions } from "vuex";
export default {
  components: { Users },
  name: "SettingsPage",
  computed: {
    ...mapState("auth", ["userData"])
  }
};
</script>
