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

    <q-dialog v-model="card" class="q-pa-md row items-start q-gutter-md ">
      <q-card class="ExpandableCard">
        <q-img class="col" src="https://cdn.quasar.dev/img/parallax2.jpg" />
        <q-img class="col" src="https://cdn.quasar.dev/img/parallax2.jpg" />

        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="place"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              Cafe Basilico
            </div>
            <div
              class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
            >
              <q-icon name="place" />
              250 ft
            </div>
          </div>

          <q-rating v-model="stars" :max="5" size="32px" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            $・Italian, Cafe
          </div>
          <div class="text-caption text-grey">
            Small plates, salads & sandwiches in an intimate setting.
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="Reserve" />
          <q-btn v-close-popup flat color="primary" round icon="event" />
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
}
</style>
