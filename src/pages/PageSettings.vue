<template>
  <!-- todo: conditional render according to permission (v-if) -->
  <q-page class="q-pa-md">
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab
          name="users-settings"
          icon="fas fa-users-cog"
          :label="$t('Users')"
        />

        <q-tab
          name="devices-settings"
          icon="device_hub"
          :label="$t('Devices')"
        />

        <q-tab
          name="average-speed-settings"
          icon="speed"
          :label="$t('AverageSpeed')"
        />

        <q-tab
          name="database-settings"
          icon="fas fa-database"
          :label="$t('Database')"
        />

        <q-tab
          name="notification-settings"
          icon="fas fa-bell"
          :label="$t('Notifications')"
        />

        <q-tab
          name="general-settings"
          icon="fas fa-tools"
          :label="$t('General')"
        />
      </q-tabs>
      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="users-settings">
          <users-settings />
        </q-tab-panel>

        <!-- <q-tab-panel name="devices-settings">
          <devices-settings />
        </q-tab-panel>

        <q-tab-panel name="average-speed-settings">
          <average-speed-settings />
        </q-tab-panel>

        <q-tab-panel name="general-settings">
          <general-settings />
        </q-tab-panel> -->
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
// import routes from '../router/r'
import { mapState, mapActions } from "vuex";
export default {
  components: {
    "users-settings": require("components/Settings/UsersSettings/UsersSettings")
      .default
  },
  name: "SettingsPage",
  data() {
    return {
      tab: "users-settings"
    };
  },
  computed: {
    ...mapState("auth", ["userData"])
  }
};
</script>
