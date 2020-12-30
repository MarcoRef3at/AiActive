import VueI18n from "vue-i18n";
import { messages, numberFormats } from "src/i18n";

export default async ({ app, Vue }) => {
  Vue.use(VueI18n);
  console.log(messages, numberFormats);
  // Set i18n instance on app
  app.i18n = new VueI18n({
    locale: "ar",
    fallbackLocale: "ar",
    messages,
    numberFormats
  });
};
