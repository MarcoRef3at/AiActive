import { Loading } from "quasar";
import { showErrorMessage } from "src/functions/fn_ShowErrorMsg";
import { tokenDecoder } from "src/functions/fn_TokenDecoder";
import { Axios } from "boot/axios";
import { Cookies } from "quasar";

const state = {
  loggedIn: false,

  token: "",

  userData: {}
};

const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value.success;
    var cookiesToken = value.token;

    //value is boolean, if true set cookies, if false remove cookies
    if (value) {
      state.token = cookiesToken;
      Cookies.set("token", cookiesToken);
    } else {
      Cookies.remove("token");
    }
  },

  setUserData(state, userData) {
    //Set UserData
    state.userData = userData;

    // Clear Token and UserData
    if (!userData) {
      state.userData = "";
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
          role: payload.isAdmin
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
            console.log("error.response.data.error:", error);
            showErrorMessage(error.response.data.message);
          }
        });
    }, 500);
  },

  isLoggedIn({ dispatch }) {
    let host = "/auth/me";
    const token = Cookies.get("token");

    Axios.post(host, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        let userAuthData = { auth: true, data: response.data };
        dispatch("handleAuthStateChange", userAuthData);
      })

      .catch(error => {
        showErrorMessage(error.response.data.error);
        let userAuthData = { auth: false };
        dispatch("handleAuthStateChange", userAuthData);
      });
  },
  ////////////////////////////////////////
  logoutUser({ dispatch }) {
    Loading.show();
    console.log("logoutUser");
    let host = "/auth/logout";
    const token = Cookies.get("token");

    Axios.get(host, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        let userAuthData = { auth: false };
        dispatch("handleAuthStateChange", userAuthData);
      })

      .catch(error => {
        showErrorMessage("Failed To Logout from the server");
        console.log("error:", error);
      });
  },

  handleAuthStateChange({ commit }, userAuthData) {
    Loading.hide();
    if (userAuthData.auth == true) {
      commit("setLoggedIn", userAuthData.data);
      commit("setUserData", tokenDecoder(userAuthData.data.token));
      this.$router.push("/");
    } else {
      commit("setLoggedIn", false);
      commit("setUserData", false);
      this.$router.replace("/auth");
    }
  },

  handleBootUserAuth({ dispatch }) {
    //If There's a token in cookies Check it with the server
    if (Cookies.has("token")) {
      dispatch("isLoggedIn");
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
