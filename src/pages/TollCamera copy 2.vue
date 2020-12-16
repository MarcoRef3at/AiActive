<template>
  <div class="q-pa-md">
    <q-table
      title="Toll Camera"
      :data="data"
      :columns="columns"
      row-key="name"
      binary-state-sort
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <span v-if="columns.name != 'Image'"> {{ data.image }}</span>

          <q-avatar
            v-if="columns.name == 'Image'"
            size="100px"
            class="shadow-10"
          >
            <img :src="props.row.image" />
          </q-avatar>
          <q-popup-edit>
            <q-card class="ExpandableCard" min-height="5rem" autofocus>
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
          </q-popup-edit>

          <q-td key="desc" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="calories" :props="props">
            {{ props.row.calories }}
          </q-td>
          <q-td key="fat" :props="props">
            <div class="text-pre-wrap">{{ props.row.fat }}</div>
          </q-td>
          <q-td key="carbs" :props="props">
            {{ props.row.carbs }}
          </q-td>
          <q-td key="protein" :props="props">{{ props.row.protein }}</q-td>
          <q-td key="sodium" :props="props">{{ props.row.sodium }}</q-td>
          <q-td key="calcium" :props="props">{{ props.row.calcium }}</q-td>
          <q-td key="iron" :props="props">{{ props.row.iron }}</q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          name: "desc",
          required: true,
          label: "Dessert (100g serving)",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "Image",
          label: "Image",
          field: "image",
          sortable: true,
          style: "width: 10px"
        },
        {
          name: "fat",
          label: "Fat (g)",
          field: "fat",
          sortable: true,
          style: "width: 10px"
        },
        { name: "carbs", label: "Carbs (g)", field: "carbs" },
        { name: "protein", label: "Protein (g)", field: "protein" },
        { name: "sodium", label: "Sodium (mg)", field: "sodium" },
        {
          name: "calcium",
          label: "Calcium (%)",
          field: "calcium",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: "iron",
          label: "Iron (%)",
          field: "iron",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        }
      ],
      data: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: "14%",
          iron: "1%",
          image: "https://cdn.quasar.dev/img/parallax2.jpg"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: "8%",
          iron: "1%",
          image: "https://cdn.quasar.dev/img/parallax2.jpg"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: "6%",
          iron: "7%",
          image: "https://cdn.quasar.dev/img/parallax2.jpg"
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: "3%",
          iron: "8%",
          image: "https://cdn.quasar.dev/img/parallax2.jpg"
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: "7%",
          iron: "16%",
          image: "https://cdn.quasar.dev/img/parallax2.jpg"
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: "0%",
          iron: "0%"
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: "0%",
          iron: "2%"
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: "0%",
          iron: "45%"
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: "2%",
          iron: "22%"
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: "12%",
          iron: "6%"
        }
      ],
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
