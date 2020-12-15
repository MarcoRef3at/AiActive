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
            <img :src="image2" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ Plates.no }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-img :src="image1" spinner-color="red" />
    </q-card>

    <q-dialog v-model="card" class="q-pa-md items-start q-gutter-md ">
      <q-card class="ExpandableCard">
        <div class="row">
          <q-img class="col" :src="image2" transition="slide-right">
            <div class="absolute-bottom-left text-subtitle2">
              {{ Plates.time }}
            </div>
            <div class="absolute-bottom-right text-subtitle2">
              {{ Plates.date }}
            </div>
          </q-img>

          <q-img class="col" :src="image1" transition="slide-left">
            <div class="absolute-bottom-left text-subtitle2">
              <div>Confidence</div>
              <div>{{ Plates.confidence }}</div>
            </div>
            <div class="absolute-bottom-right text-subtitle2">
              <div>Brand: {{ Plates.brand }}</div>
              <div>Model: {{ Plates.model }}</div>
              <div>Colour: {{ Plates.color }}</div>
            </div>
            <div class="absolute-top text-subtitle2">
              <div class="absolute-center text-subtitle1">
                {{ Plates.no }}
              </div>
            </div>
          </q-img>
        </div>

        <q-card-actions align="center">
          <q-btn
            class="full-width"
            v-close-popup
            flat
            color="primary"
            label="Confirm"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      Plates: {
        no: "ط ر ت 123",
        brand: "Hyundai",
        model: "Accent",
        color: "black",
        confidence: "90%",
        time: "10:50",
        date: "20/10/2020"
      },

      image1: "https://cdn.quasar.dev/img/parallax2.jpg",
      image2: "https://cdn.quasar.dev/img/avatar2.jpg",
      card: false
    };
  }
};
</script>

<style>
.my-card {
  width: 100%;
  max-width: 250px;
}
.ExpandableCard {
  width: 100%;
}
</style>
