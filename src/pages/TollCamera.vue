<template>
  <div class="q-pa-md">
    <q-table title="Toll Camera" :data="data" :columns="columns" row-key="name">
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <span v-if="col.name != 'Image' && col.name != 'Plate_Image'">
              {{ col.value }}</span
            >
            <q-avatar v-if="col.name == 'Image'" size="100px" class="shadow-10">
              <img :src="props.row.image" />
            </q-avatar>
            <q-avatar
              v-if="col.name == 'Plate_Image'"
              size="100px"
              class="shadow-10"
            >
              <img :src="props.row.plate_image" />
            </q-avatar>
          </q-td>
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
          name: "Plate No.",
          required: true,
          label: "Plate No.",
          field: row => row.name,
          align: "left",
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "Date",
          label: "Date",
          field: row => row.date,
          align: "center",
          sortable: true
        },
        {
          name: "Time",
          label: "Time",
          field: row => row.time,
          align: "center",
          sortable: true
        },
        {
          name: "Brand",
          label: "Brand",
          field: row => row.brand,
          align: "center",
          sortable: true
        },
        {
          name: "Model",
          label: "Model",
          field: row => row.model,
          align: "center",
          sortable: true
        },
        {
          name: "Color",
          label: "Color",
          field: row => row.color,
          align: "center",
          sortable: true
        },
        {
          name: "Plate_Image",
          label: "Plate Image",
          field: "plate_image",
          style: "width: 5px"
        },
        {
          name: "Image",
          label: "Image",
          field: "image",
          style: "width: 5px"
        }
      ],
      data: [
        {
          name: "ط ر ا 1 2 3",
          date: 237,
          time: 9.0,
          brand: 37,
          model: 4.3,
          color: 129,
          plate_image: "https://cdn.quasar.dev/img/parallax2.jpg",
          image: "https://cdn.quasar.dev/img/avatar2.jpg"
        },
        {
          name: "ك ي ف 5 8 9",
          date: 262,
          time: 16.0,
          brand: 23,
          model: 6.0,
          color: 337,
          plate_image: "https://cdn.quasar.dev/img/parallax2.jpg",
          image: "https://cdn.quasar.dev/img/avatar2.jpg"
        },
        {
          name: "ا خ ة 9 6 3",
          date: 305,
          time: 3.7,
          brand: 67,
          model: 4.3,
          color: 413,
          plate_image: "https://cdn.quasar.dev/img/parallax2.jpg",
          image: "https://cdn.quasar.dev/img/avatar2.jpg"
        }
      ]
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
