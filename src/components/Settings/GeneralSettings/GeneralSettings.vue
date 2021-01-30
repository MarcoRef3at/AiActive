<template>
  <form @submit="onSubmit" class="q-pa-md">
    <q-select
      :label="$t('SelectLanguage')"
      v-model="lang"
      :options="langOptions"
      dense
      borderless
      map-options
      options-dense
      style="max-width: 150px"
    />
    <q-color
      name="accent_color"
      v-model="color"
      style="width: 200px; max-width: 100%;"
    />
    <div
      v-for="(item, index) in submitResult"
      :key="index"
      class="q-px-sm q-py-xs bg-grey-8 text-white rounded-borders text-center text-no-wrap"
    >
      {{ item.name }} = {{ item.value }}
    </div>
    <div class="row justify-end">
      <q-btn type="submit" :label="$t('Apply')" class="q-mt-md" color="blue">
      </q-btn>
    </div>
  </form>
</template>

<script>
import languages from "quasar/lang/index.json";
import { Loading } from "quasar";
import { colors } from "quasar";

const appLanguages = languages.filter(lang =>
  ["ar", "en-us"].includes(lang.isoName)
);
export default {
  data() {
    return {
      lang: this.$i18n.locale,
      color: "#f66363",
      submitResult: []
    };
  },
  methods: {
    onSubmit() {
      this.setLanguage();
      this.setColor(color);
    },
    setLanguage() {
      Loading.show();
      setTimeout(() => {
        //Change Language
        this.$i18n.locale = this.lang.value;
        //Change RTL direction
        import(`quasar/lang/${this.lang.value}`).then(language => {
          this.$q.lang.set(language.default);
        });
        Loading.hide();
      }, 300);
    },
    setColor(color) {
      Loading.show();
      setTimeout(() => {
        //Change Language
        const { setBrand } = colors;
        setBrand("primary", color);
        Loading.hide();
      }, 300);
    },
    // todo : bayzaaaa
    setTheme(color) {
      // get status
      this.$q.dark.set(false);
      // console.log(this.$q.dark.isActive); // true, false
      // destructuring to keep only what is needed
      const { setBrand } = colors;
      setBrand("primary", color);
    }
  },

  created() {
    this.langOptions = appLanguages.map(lang => ({
      label: lang.nativeName,
      value: lang.isoName
    }));
  }
};
</script>
