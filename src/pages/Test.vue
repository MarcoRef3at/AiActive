<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <q-select
        label="Select Language"
        v-model="lang"
        map-options
        :options="langs"
        class="row"
      />
      <div class="row q-pt-md">Phrase for Success: {{ $t("success") }}</div>
      <div class="row q-pt-md">Phrase for Failure: {{ $t("failed") }}</div>
      <div class="row q-pt-md">Current Language: {{ $i18n.locale }}</div>
      <div class="row q-pt-md">Currency: {{ $n(100, "currency") }}</div>
      Currency with functional Component:
      <i18n-n :value="100" format="currency"></i18n-n>
      <div>
        <q-table
          :data="data"
          :columns="columns"
          row-key="name"
          :pagination.sync="pagination"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="name" :props="props">{{ props.row.name }}</q-td>
              <q-td key="surname" :props="props">{{ props.row.surname }}</q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      langs: [
        {
          label: "German",
          value: "de"
        },
        {
          label: "US English",
          value: "en-us"
        }
      ],
      lang: this.$i18n.locale,
      pagination: {
        rowsPerPage: 0,
        page: 1
      },
      selected: [],
      columns: [
        {
          name: "name",
          align: "center",
          label: this.$t("name"),
          field: "name",
          sortable: true
        },
        {
          name: "surname",
          align: "center",
          label: this.$t("surname"),
          field: "surname",
          sortable: true
        }
      ],
      data: [
        {
          name: "Name1",
          surname: "name 1"
        },
        {
          name: "Name2",
          surname: "name 2"
        }
      ]
    };
  },
  watch: {
    lang(lang) {
      this.$i18n.locale = lang.value;
      // set quasar's language too!!
      import(`quasar/lang/${lang.value}`).then(language => {
        this.$q.lang.set(language.default);
      });
    }
  }
};
</script>
