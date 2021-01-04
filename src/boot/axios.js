import Vue from "vue";
import axios from "axios";
const Axios = axios.create({
  baseURL: "http://196.219.234.3:9300/api/v1",
  headers: { "Content-type": "application/json" },
  withCredentials: true
});

Vue.prototype.$axios = axios;
export { Axios };
