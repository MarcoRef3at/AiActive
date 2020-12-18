<template>
  <div class="q-pa-md">
    <q-table
      :data="lprData"
      :pagination="Pagination"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr
          :props="props"
          class="cursor-pointer"
          @click="setCarousel(props.row)"
        >
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <span v-if="col.name != 'Image' && col.name != 'Plate_Image'">
              {{ col.value }}</span
            >
            <q-avatar v-if="col.name == 'Image'" size="50px" class="shadow-10">
              <img :src="props.row.image" />
            </q-avatar>
            <q-avatar
              v-if="col.name == 'Plate_Image'"
              size="50px"
              class="shadow-10"
            >
              <img :src="props.row.plate_image" />
            </q-avatar>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model="carousel" class=" q-pa-md items-start q-gutter-md ">
      <q-card class="ExpandableCard">
        <div class="row">
          <q-img
            class="col"
            :src="activeCarousel.image"
            transition="slide-right"
            style="height: 400px; max-width: 500px"
          >
            <div class="absolute-top text-h6 text-weight-bold  ">
              <div class="absolute-left q-mx-md ">
                <span>{{ activeCarousel.date }}</span> <span> </span>
              </div>
              <div class="absolute-right q-mx-md ">
                <span>{{ activeCarousel.time }}</span>
              </div>
            </div>
          </q-img>

          <q-img
            class="col"
            :src="activeCarousel.plate_image"
            transition="slide-left"
            style="height: 400px; max-width: 500px"
          >
            <div class="absolute-bottom text-subtitle2">
              <div>Brand: {{ activeCarousel.brand }}</div>
              <div>Model: {{ activeCarousel.model }}</div>
              <div>Colour: {{ activeCarousel.color }}</div>
            </div>
            <div class="absolute-top text-h6 text-weight-bold">
              <div class="absolute-center ">
                {{ activeCarousel.name }}
              </div>
            </div>
          </q-img>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      carousel: false,
      activeCarousel: [],
      columns: [
        {
          name: "ID",
          required: true,
          label: "ID",
          field: row => row.id,
          align: "left",
          format: val => `${val}`,
          sortable: true
        },
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
          name: "Plate_Image",
          label: "Plate Image",
          field: "plate_image",
          style: "width: 5px"
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
          name: "Image",
          label: "Image",
          field: "image",
          style: "width: 5px"
        }
      ]
    };
  },
  methods: {
    setCarousel(data) {
      this.activeCarousel = data;
      this.carousel = true;
      console.log("pagination", this.paginations);
      console.log("xx", this.xx);
    },
    setPagination() {
      this.paginate.page = this.pagination.page;
      this.paginate.rowsPerPage = this.paginate.limit;
    }
  },
  computed: {
    ...mapState("toll", ["lprData", "pagination"]),
    Pagination: function() {
      const paginate = {};
      paginate.rowsPerPage = this.pagination.limit;
      paginate.page = this.pagination.page;
      return paginate;
    }
  }
};
</script>
<style>
.ExpandableCard {
  width: 100%;
}
</style>
