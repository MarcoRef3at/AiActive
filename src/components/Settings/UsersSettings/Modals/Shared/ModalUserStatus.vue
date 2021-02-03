<template>
  <div class="column status">
    <q-select
      outlined
      @input="$emit('update:status', $event.value)"
      v-model="model"
      :options="options"
      label="User Status"
      stack-label
      class="col"
    />
  </div>
</template>

<script>
export default {
  props: ["status"],
  data() {
    return {
      options: [
        {
          label: "Enable",
          value: true
        },
        {
          label: "Disable",
          value: false
        }
      ]
    };
  },
  methods: {},
  mounted() {
    this.model = this.status;
  },
  computed: {
    model: {
      get() {
        if (this.status)
          return {
            label: "Enable",
            value: 1
          };
        else
          return {
            label: "Disable",
            value: 0
          };
      },
      set(value) {
        //console.log(value);
      }
    }
  }
};
</script>
<style scoped>
.status {
  min-width: 170px;
}
</style>
