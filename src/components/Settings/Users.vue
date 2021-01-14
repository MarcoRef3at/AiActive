<template>
  <div>
    Users page
    <div>
      <button @click="this.getUsers">
        Get All Users
      </button>
    </div>
    <div>
      <form @submit.prevent="submitForm">
        <q-input type="text" v-model="data.name" label="Name" />
        <q-input type="text" v-model="data.email" label="Email" />
        <q-input type="text" v-model="data.role" label="Role" />
        <button type="submit">
          Update User
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      data: {
        name: "",
        email: "",
        role: "admin",
        id: 38
      }
    };
  },

  methods: {
    ...mapActions("users", ["getUsers", "updateUser"]),
    submitForm() {
      this.updateUser(this.data);
    }
  },
  mounted() {},
  computed: {
    ...mapState("users", ["users"])
  },
  filters: {}
};
</script>
