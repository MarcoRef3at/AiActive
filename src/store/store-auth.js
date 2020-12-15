// import config from "@/../config/config.env";
import { LocalStorage, Loading, QSpinnerPie } from "quasar";
import { showErrorMessage } from "src/functions/fn_ShowErrorMsg";
import { tokenDecoder } from "src/functions/fn_TokenDecoder";
import { Axios } from "boot/axios";
import { Cookies } from "quasar";

const state = {
  loggedIn: Cookies.has("token"),
  token: Cookies.get("token"),
  userData: {}
};

const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value;
    var cookies = Cookies.get("token");
    //value is boolean, if true set cookies, if false remove cookies
    if (value) {
      state.token = cookies;
      Cookies.set("token", cookies);
    } else {
      Cookies.remove("token");
    }
  },

  setUserData(state, userData) {
    Object.assign(state.userData, userData);
    if (!userData) {
      // clear userData
      Object.keys(state.userData).forEach(k => (state.userData[k] = ""));
      state.token = null;
    }
  }
};

const actions = {
  registerUser({ dispatch }, payload) {
    Loading.show();

    setTimeout(() => {
      let host = "/auth/register";

      Axios.post(
        host,
        {
          name: payload.name,
          email: payload.email,
          password: payload.password,
          isAdmin: payload.isAdmin
        },
        { withCredentials: true }
      )

        .then(response => {
          let userAuthData = { auth: true, data: response.data };
          dispatch("handleAuthStateChange", userAuthData);
        })

        .catch(error => {
          if (error.message == "Network Error") {
            showErrorMessage("Server Offline");
            return;
          } else {
            showErrorMessage(error.response.data.message);
          }
        });
    }, 500);
  },

  loginUser({ dispatch }, payload) {
    Loading.show();

    setTimeout(() => {
      let host = "/auth/login";

      Axios.post(
        host,
        {
          email: payload.email,
          password: payload.password
        },
        { withCredentials: true }
      )

        .then(response => {
          let userAuthData = { auth: true, data: response.data };
          dispatch("handleAuthStateChange", userAuthData);
        })

        .catch(error => {
          if (error.message == "Network Error") {
            showErrorMessage("Server Offline");
            return;
          } else {
            showErrorMessage(error.response.data.message);
          }
        });
    }, 500);
  },

  isLoggedIn() {
    let host = "/auth/me";
    const token = Cookies.get("token");
    Axios.get(host, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        const decoded = tokenDecoder(token);
        console.log(decoded);
        showErrorMessage(decoded.id);
      })

      .catch(error => {
        showErrorMessage(error.response.data.message);
      });
  },

  logoutUser({ dispatch }) {
    Loading.show();
    console.log("logoutUser");
    let userAuthData = { auth: false };
    dispatch("handleAuthStateChange", userAuthData);
  },

  handleAuthStateChange({ commit }, userAuthData) {
    Loading.hide();
    if (userAuthData.auth == true) {
      commit("setLoggedIn", true);
      commit("setUserData", userAuthData.data);
      this.$router.push("/");
    } else {
      commit("setLoggedIn", false);
      commit("setUserData", false);
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
