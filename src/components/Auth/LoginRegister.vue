<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md column">
      <q-banner class="bg-grey-3">
        <template v-slot:avatar>
          <q-icon name="login" color="primary" />
        </template>
        Login to access your AIACTIVE platform!
      </q-banner>
      <q-input color="teal" outlined v-model="text" label="Username" />
      <q-input
        color="teal"
        outlined
        v-model="password"
        label="Password"
        :type="isPwd ? 'password' : 'text'"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-btn label="Login" color="primary" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: "",
      password: "",
      isPwd: true,
      email: "",
      search: "",
      tel: "",
      url: "",
      time: "",
      date: ""
    };
  }
};
</script>
