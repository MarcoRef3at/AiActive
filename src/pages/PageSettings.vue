<template>
  <!-- todo: conditional render according to permission (v-if) -->
  <q-page class="flex flex-center">
    <Users />
  </q-page>
</template>

<script>
import Users from "src/components/Settings/UsersSettings/UsersSettings";
export default {
  components: { Users },
  name: "SettingsPage"
};
</script>
