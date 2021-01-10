import { Loading } from "quasar";
import { showErrorMessage } from "src/functions/fn_ShowErrorMsg";
import { tokenDecoder } from "src/functions/fn_TokenDecoder";
import { Axios } from "boot/axios";
import { Cookies } from "quasar";

const token = Cookies.get("token");
const headers = {
  Authorization: `Bearer ${token}`
};

const state = {
  loggedIn: false,

  token: "",

  userData: {}
};

const mutations = {
  setLoggedIn(state, payload) {
    state.loggedIn = payload.success; //Boolean true or false
    var cookiesToken = payload.token; //Token from body

    //payload is either data or false
    //if not false set cookies
    if (payload != false) {
      state.token = cookiesToken;
      Cookies.set("token", cookiesToken);
    }
    // if false remove cookies
    else {
      Cookies.remove("token");
    }
  },

  //payload is either data OR false
  //if not false set userData
  setUserData(state, payload) {
    //Set UserData
    state.userData = payload;

    // Clear Token and UserData
    if (!payload) {
      state.userData = "";
      state.token = null;
    }
  }
};

const actions = {
  //Login or Register Action
  login_register({ dispatch }, payload) {
    Loading.show();

    setTimeout(() => {
      //payload.status = login or register
      let host = `/auth/${payload.status}`;

      Axios.post(host, {
        email: payload.email,
        password: payload.password,
        name: payload.name,
        role: payload.isAdmin
      })

        .then(response => {
          //Set UserData and LoggedIn then Route to homepage
          let userAuthData = { auth: true, data: response.data };
          dispatch("handleAuthStateChange", userAuthData);
        })

        .catch(error => {
          if (error.message == "Network Error") {
            showErrorMessage("Server Offline");
            return;
          } else {
            showErrorMessage(error.response.data.error);
          }
        });
    }, 500);
  },

  isLoggedIn({ dispatch }) {
    let host = "/auth/me";

    Axios.post(host, {}, { headers: headers })

      .then(response => {
        let payload = { auth: true, data: response.data };
        //In /auth/me response comes with no token so we add it from cookies
        payload.data.token = Cookies.get("token");
        dispatch("handleAuthStateChange", payload);
      })

      .catch(error => {
        showErrorMessage(error.response.data.error);
        //Client-Side Logout
        let payload = { auth: false };
        dispatch("handleAuthStateChange", payload);
      });
  },

  logoutUser({ dispatch }) {
    Loading.show();

    //Client-Side Logout
    let userAuthData = { auth: false };
    dispatch("handleAuthStateChange", userAuthData);

    let host = "/auth/logout";

    //Server-Side Logout
    Axios.get(host, {}, { headers: headers }).catch(error => {
      showErrorMessage("Failed To Logout from the server");
      console.log("error:", error);
    });
  },

  handleAuthStateChange({ commit }, payload) {
    Loading.hide();
    ///////Change .success to be enabled or disabled
    if (payload.auth == true && payload.data.success == true) {
      commit("setLoggedIn", payload.data);
      commit("setUserData", tokenDecoder(payload.data.token));

      if (this.$router.history.current.fullPath != "/") {
        this.$router.push("/");
      }
    } else {
      commit("setLoggedIn", false);
      commit("setUserData", false);
      if (this.$router.history.current.fullPath != "/auth") {
        this.$router.replace("/auth");
      }
    }
  },

  handleBootUserAuth({ dispatch }) {
    //If There's a token in cookies validate it from the server
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
