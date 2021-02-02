<template>
  <div class="q-pa-md">
    <q-form @submit="onSubmit" class="q-gutter-md">
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
        v-model="color"
        no-header
        no-footer
        class="my-picker"
        style="width: 200px; max-width: 100%;"
      />

      <div class="row justify-end">
        <q-btn
          type="submit"
          :label="$t('Apply')"
          class="q-mt-md"
          color="primary"
        >
        </q-btn>
      </div>
    </q-form>
  </div>
</template>
<script>
import languages from "quasar/lang/index.json";
const appLanguages = languages.filter(lang =>
  ["ar", "en-us"].includes(lang.isoName)
);
import { Loading } from "quasar";
import { colors } from "quasar";

export default {
  data() {
    return {
      lang: localStorage.getItem("Language") || "en-us",
      color: localStorage.getItem("ThemeColor") || "#027be3",
      langOptions: [],
      submitResult: []
    };
  },

  methods: {
    setTheme() {
      const { setBrand } = colors;
      setBrand("primary", this.color);
      localStorage.setItem("ThemeColor", this.color);
    },
    setLanguage() {
      //Change Language
      // todo : remove this condition and handle undefined and null values
      if (this.lang.value != null && this.lang.value != "undefined") {
        this.$i18n.locale = this.lang.value;

        console.log("this.lang:", this.lang);
        //Change RTL direction
        import(`quasar/lang/${this.lang.value}`).then(language => {
          this.$q.lang.set(language.default);
        });
        localStorage.setItem("Language", this.lang.value);
      }
    },
    onSubmit() {
      Loading.show();
      setTimeout(() => {
        this.setLanguage();
        this.setTheme();
        Loading.hide();
      }, 300);
    }
  },
  created() {
    console.log("this.$i18n.locale:", this.$i18n.fallbackLocale);
    this.langOptions = appLanguages.map(lang => ({
      label: lang.nativeName,
      value: lang.isoName
    }));
  }
};
</script>
