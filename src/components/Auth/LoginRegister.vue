<template>
  <form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>

        {{ login_register_status | titleCase }} to access your AIACTIVE
        platform!
      </q-banner>
    </div>

    <div class="row q-mb-md">
      <!-- //Name (if Register Tab) -->
      <q-input
        v-if="login_register_status == 'register'"
        color="teal"
        class="col"
        outlined
        v-model="formData.name"
        label="Name"
        stack-label
        lazy-rules
        ref="name"
      />
    </div>

    <!-- //Email -->
    <div class="row q-mb-md">
      <q-input
        color="teal"
        class="col"
        outlined
        v-model="formData.email"
        label="Email"
        stack-label
        :rules="[
          val =>
            isValidEmailAddress(val) || 'Please enter a valid email address'
        ]"
        lazy-rules
        ref="email"
      />
    </div>

    <!-- //Password -->
    <div class="row q-mb-md">
      <q-input
        color="teal"
        class="col"
        outlined
        v-model="formData.password"
        label="Password"
        :type="isPwd ? 'password' : 'text'"
        stack-label
        :rules="[
          val => val.length >= 6 || 'Please enter at least 6 characters'
        ]"
        lazy-rules
        ref="password"
      >
        <!-- //Show Password Button -->
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
    </div>

    <!-- //Role (if Register Tab) -->
    <div class="row q-mb-md">
      <q-select
        class="mwidth"
        v-if="login_register_status == 'register'"
        filled
        v-model="formData.role"
        :options="roleOptions"
        stack-label
        label="Account Role"
        :display-value="`${formData.role ? formData.role : 'user'}`"
      >
        <template v-slot:append>
          <q-icon
            v-if="formData.role !== null"
            class="cursor-pointer"
            name="clear"
            @click.stop="formData.role = null"
          />
        </template>
      </q-select>
    </div>

    <!-- //Submit Button (Login or Register) -->
    <div class="row q-mb-md">
      <q-space />
      <q-btn type="submit" :label="login_register_status" color="primary" />
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["login_register_status"],

  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
        role: "user",
        status: this.login_register_status
      },
      roleOptions: ["admin", "publisher"],
      isPwd: true
    };
  },
  methods: {
    ...mapActions("auth", ["login_register", "isLoggedIn"]),

    submitForm() {
      this.$refs.email.validate();
      this.$refs.password.validate();
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        ////////////////////////Password is not encrypted in console////////////////////////
        this.login_register(this.formData);
      }
    },

    isValidEmailAddress(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  },

  filters: {
    titleCase(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>
<style>
.mwidth {
  min-width: 180px;
}
</style>
