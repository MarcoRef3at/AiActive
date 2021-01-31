import VueI18n from "vue-i18n";
import { messages } from "src/i18n";
import { LocalStorage } from "quasar";
export default async ({ app, Vue }) => {
  let savedLanguage = LocalStorage.getItem("Language");
  Vue.use(VueI18n);
  // Set i18n instance on app
  app.i18n = new VueI18n({
    locale: savedLanguage || "en-us",
    fallbackLocale: savedLanguage || "en-us",
    messages
  });
};
