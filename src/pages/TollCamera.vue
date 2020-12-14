<template>
  <q-page padding>
    <q-card
      v-ripple
      class="my-card cursor-pointer q-hoverable my-card"
      @click="card = true"
    >
      <q-item>
        <q-item-section avatar>
          <q-avatar size="100px">
            <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>Toll Camera</q-item-label>
        </q-item-section>
      </q-item>
      <q-img
        src="https://cdn.quasar.dev/img/parallax2.jpg"
        spinner-color="red"
      />
    </q-card>

    <q-dialog v-model="card" class="q-pa-md items-start q-gutter-md ">
      <q-card class="ExpandableCard">
        <div class="row">
          <q-img class="col" src="https://cdn.quasar.dev/img/avatar2.jpg" />
          <q-img class="col" src="https://cdn.quasar.dev/img/parallax2.jpg" />
        </div>

        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              Plate No. Date Time confidence color brand model
            </div>
          </div>
        </q-card-section>
        <q-separator />

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="Confirm" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      carousel: false,
      card: false,
      sliders: false,

      slide: 1,
      lorem:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!",

      stars: 3,

      slideVol: 39,
      slideAlarm: 56,
      slideVibration: 63,
      tab: "login"
    };
  },
  components: {
    "login-register": require("components/Auth/LoginRegister.vue").default
  }
};
</script>

<style>
.auth-tabs {
  max-width: 500px;
  margin: 0 auto;
}
.my-card {
  width: 100%;
  max-width: 250px;
}
.ExpandableCard {
  width: 200%;
  max-width: 1000px;
  height: 100%;
}
</style>
