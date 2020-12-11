// import config from "@/../config/config.env";
import axios from "axios";
const Axios = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: { "Content-type": "application/json" },
  withCredentials: true
});

import { LocalStorage, Loading, QSpinnerPie } from "quasar";
import { showErrorMessage } from "src/functions/fn_ShowErrorMsg";

//Cookies Import
import Vue from "vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
Vue.$cookies.config("7d");
var cookies = ""; // return value

//loading spin GUI
function loading() {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: "blue",
    spinnerSize: 140,
    backgroundColor: "gery",
    message: "Some important process is in progress. Hang on...",
    messageColor: "black"
  });
}

const state = {
  LoggedIn: $cookies.isKey("token"),
  token: null,
  userData: {
    userName: "",
    email: "",
    isAdmin: "",
    isActive: ""
  }
};

const mutations = {
  setLoggedIn(state, value) {
    state.LoggedIn = value;
  },
  setUserData(state, userData) {
    Object.assign(state.userData, userData);
    if (!userData)
      // clear userData
      Object.keys(state.userData).forEach(k => (state.userData[k] = ""));
    state.token = null;
  },
  setToken(state, value) {
    state.token = value;
  }
};

const actions = {
  registerUser({ dispatch }, payload) {
    Loading.show();

    setTimeout(() => {
      return new Promise((resolve, reject) => {
        let host = "/auth/register";

        Axios.post(host, {
          name: payload.name,
          email: payload.email,
          password: payload.password,
          isAdmin: payload.isAdmin
        })

          .then(response => {
            let userAuthData = { auth: true, data: response.data };
            dispatch("handleAuthStateChange", userAuthData);
          })

          .catch(error => {
            if (error.message == "Network Error") {
              showErrorMessage("Server Offline");
              return;
            }

            if (error.response.status === 401) {
              showErrorMessage(error.response.data.message);
              return;
            } else if (error.response.status === 404) {
              showErrorMessage(error.response.data.message);
              return;
            } else {
              showErrorMessage(error.response.data.error);
            }
          });
      });
    }, 500);
  },

  loginUser({ dispatch }, payload) {
    Loading.show();

    setTimeout(() => {
      return new Promise((resolve, reject) => {
        let host = "/auth/login";

        Axios.post(host, {
          email: payload.email,
          password: payload.password
        })

          .then(response => {
            let userAuthData = { auth: true, data: response.data };
            dispatch("handleAuthStateChange", userAuthData);
          })

          .catch(error => {
            if (error.message == "Network Error") {
              showErrorMessage("Server Offline");
              return;
            }

            if (error.response.status === 401) {
              showErrorMessage(error.response.data.message);
              return;
            } else if (error.response.status === 404) {
              showErrorMessage(error.response.data.message);
              return;
            } else {
              showErrorMessage(error.response.data.message);
            }
          });
      });
    }, 500);
  },

  isLoggedIn() {
    let host = "/auth/me";
    Axios.get(host, {
      headers: { Authorization: `Bearer ${state.token}` }
    })
      .then(response => {
        console.log(response);
        function parseJwt(token) {
          var base64Url = token.split(".")[1];
          var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          var jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map(function(c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join("")
          );

          return JSON.parse(jsonPayload);
        }
        console.log(parseJwt(state.token));
        showErrorMessage(parseJwt(state.token));
      })
      .catch(error => {
        showErrorMessage(error.response.data.message);
      });
  },

  logoutUser({ dispatch }) {
    loading();
    console.log("logoutUser");
    let userAuthData = { auth: false };
    dispatch("handleAuthStateChange", userAuthData);
  },

  handleAuthStateChange({ commit }, userAuthData) {
    Loading.hide();
    //*********************check error***************************************
    if (userAuthData.auth) {
      commit("setLoggedIn", true);
      commit("setUserData", userAuthData.data);
      cookies = $cookies.get("token");
      $cookies.set("token", cookies);
      console.log("cookies=", cookies);
      commit("setToken", cookies);

      LocalStorage.set("loggedIn", true);
      LocalStorage.set("loggedInUser", userAuthData.user);
      LocalStorage.set("loggedInUserToken", userAuthData.token);

      this.$router.push("/");
    } else {
      commit("setLoggedIn", false);
      commit("setUserData", false);
      cookies = null;
      $cookies.remove("token");
      console.log("cookies=", cookies);
      commit("setToken", cookies);

      LocalStorage.remove("loggedIn");
      LocalStorage.remove("loggedInUser");
      LocalStorage.remove("loggedInUserToken");

      // LocalStorage.set('loggedIn', false)
      // LocalStorage.set('loggedInUser', {})
      this.$router.replace("/auth");
    }
  },
  handleBootUserAuth({ commit }) {
    let loggedIn = LocalStorage.getItem("loggedIn");
    let loggedInUser = LocalStorage.getItem("loggedInUser");
    if (!loggedIn) return;
    commit("setLoggedIn", loggedIn);
    commit("setUserData", loggedInUser);
  }
};
const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
