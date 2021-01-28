<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      :value="email"
      @input="$emit('update:email', $event)"
      :rules="[
        val => isValidEmailAddress(val) || 'Please enter a valid email address.'
      ]"
      lazy-rules
      ref="email"
      label="User email"
      stack-label
      class="col"
    >
      <!-- v-select-all -->
      <template v-slot:append>
        <q-icon
          v-if="email"
          @click="$emit('update:email', '')"
          name="close"
          class="cursor-pointer"
        />
      </template>
    </q-input>
  </div>
</template>

<script>
// import { selectAll } from 'src/directives/directive-select-all'

export default {
  props: ["email"],
  // directives: {
  // 	selectAll
  // },
  methods: {
    isValidEmailAddress(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  }
};
</script>
