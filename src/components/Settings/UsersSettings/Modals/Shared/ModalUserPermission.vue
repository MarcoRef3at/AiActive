<template>
  <div class="column q-mr-sm permission">
    <q-select
      outlined
      @input="$emit('update:isAdmin', $event.value)"
      v-model="model"
      :options="options"
      label="Permission"
      stack-label=""
      class="col"
    />
  </div>
</template>

<script>
export default {
  props: ["isAdmin"],
  data() {
    return {
      options: [
        {
          label: "Admin",
          value: 1
        },
        {
          label: "User",
          value: 0
        }
      ]
    };
  },
  methods: {},
  mounted() {
    // this.model = this.isAdmin;
    // console.log("permission", this.model);
  },
  computed: {
    model: {
      get() {
        if (this.isAdmin)
          return {
            label: "Admin",
            value: 1
          };
        else
          return {
            label: "User",
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
.permission {
  min-width: 170px;
}
</style>
