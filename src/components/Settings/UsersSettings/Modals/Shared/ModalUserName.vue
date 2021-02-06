<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      :value="name"
      @input="$emit('update:name', $event)"
      :rules="[val => !!val || 'Field is required']"
      lazy-rules
      autofocus
      ref="name"
      label="User name"
      stack-label
      class="col"
      v-select-all
      clearable
    >
    </q-input>
  </div>
</template>

<script>
import { selectAll } from "src/directives/directive-select-all";

export default {
  props: ["name"],
  directives: {
    selectAll
  }
};
</script>
