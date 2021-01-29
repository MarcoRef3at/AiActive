<template>
  <q-card-actions align="right">
    <q-btn label="Save" color="primary" type="submit" :loading="loading" />
  </q-card-actions>
</template>

<script>
export default {
  props: ["loading"]
};
</script>
