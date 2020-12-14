// import config from "@/../config/config.env";
import { LocalStorage, Loading, QSpinnerPie } from "quasar";
import { showErrorMessage } from "src/functions/fn_ShowErrorMsg";
import { Axios } from "boot/axios";
import { Cookies } from "quasar";
var cookies;

const state = {
  loggedIn: Cookies.has("token"),
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
    state.loggedIn = value;
    //value is boolean, if true set cookies, if false remove cookies
    if (value) {
      cookies = Cookies.get("token");
      Cookies.set("token", cookies);
    } else {
      cookies = null;
      Cookies.remove("token");
    }
    state.token = cookies;
    console.log("cookies=", cookies);
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
    Axios.get(host, {
      headers: {
        Authorization: `Bearer ${state.token}`
      }
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
        showErrorMessage("Token Decoded in Console");
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

  handleAuthStateChange({ commit, dispatch }, userAuthData) {
    Loading.hide();
    //*********************check error***************************************
    console.log("userAuthData.auth", userAuthData.auth);
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
