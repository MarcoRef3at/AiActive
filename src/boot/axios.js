import Vue from "vue";
import axios from "axios";
const Axios = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: { "Content-type": "application/json" },
  withCredentials: true
});

Vue.prototype.$axios = axios;
export { Axios };
