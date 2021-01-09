import Vue from "vue";
import axios from "axios";
import config from "@/../../config/config";

// Creat Axios Instance
const Axios = axios.create({
  baseURL: config.API_URL,
  headers: { "Content-type": "application/json" },
  withCredentials: true
});

Vue.prototype.$axios = axios;
export { Axios };
