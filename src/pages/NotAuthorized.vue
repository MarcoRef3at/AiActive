<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
      <div style="font-size: 30vh">
        Oops Not Authorized
      </div>

      <div class="text-h2" style="opacity:.4">
        Nothing here...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error404"
};
</script>
