import { Cookies } from "quasar";

export default {
  API_URL: "http://196.219.234.3:9300/api/v1",
  TOKEN: Cookies.get("token")
};