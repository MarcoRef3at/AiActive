// import config from "@/../config/config.env";
import axios from "axios";
const Axios = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: { "Content-type": "application/json" },
  withCredentials: true
});

import { LocalStorage, Loading, QSpinnerPie } from "quasar";
import { showErrorMessage } from "src/functions/fn_ShowErrorMsg";

import { firebaseAuth } from "boot/firebase";
import FeatureDataService from "../services/FeatureDataService";

//Cookies Import
import Vue from "vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
Vue.$cookies.config("7d");
var cookies = ""; // return value
// $cookies.set("token", cookies);

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
  LoggedIn: false,
  userData: {
    userName: "",
    email: "",
    isAdmin: "",
    isActive: ""
  },
  token: ""
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
  },
  setToken(state, value) {
    state.token = value;
  }
};

const actions = {
  registerUser({}, payload) {
    loading();
    // console.log(payload.name);
    FeatureDataService.register(payload)
      .then(response => {
        console.log(response);
        console.log("cookies=", cookies);
      })
      .catch(error => {
        console.log(error);
        showErrorMessage(error.response.data.error);
      });
  },

  loginUser({ commit, dispatch }, payload) {
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
            }
          });
      });
    }, 500);
  },
  // registerUser({}, payload) {
  //   loading();
  //   firebaseAuth
  //     .createUserWithEmailAndPassword(payload.email, payload.password)
  //     .then(response => {
  //       // console.log("response: ", response);
  //     })
  //     .catch(error => {
  //       showErrorMessage(error.message);
  //     });
  // },

  isLoggedIn() {
    let host = "/auth/me";
    Axios.get(host, {
      headers: { Authorization: `Bearer ${state.token}` }
    })

      .then(response => {
        showErrorMessage("LoggedIn");
      })
      .catch(error => {
        showErrorMessage(error.response.data.error);
      });
  },
  logoutUser({ dispatch }) {
    loading();
    console.log("logoutUser");
    let userAuthData = { auth: false };
    dispatch("handleAuthStateChange", userAuthData);
  },
  // handleAuthStateChange({ commit }) {
  //   firebaseAuth.onAuthStateChanged(user => {
  //     Loading.hide();
  //     if (user) {
  //       commit("setLoggedIn", true);
  //       LocalStorage.set("loggedIn", true);
  //       this.$router.push("/");
  //     } else {
  //       commit("setLoggedIn", false);
  //       LocalStorage.set("loggedIn", false);

  //       this.$router.replace("/auth");
  //     }
  //   });
  // }
  handleAuthStateChange({ commit }, userAuthData) {
    Loading.hide();
    console.log("userAuthdata", userAuthData.auth);
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
      cookies = null
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
