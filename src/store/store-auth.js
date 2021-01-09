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
    state.loggedIn = value.success; //Boolean true or false
    var cookiesToken = value.token; //Token from body

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
  login_register({ dispatch }, payload) {
    Loading.show();

    setTimeout(() => {
      let host = `/auth/${payload.status}`;

      Axios.post(
        host,
        {
          email: payload.email,
          password: payload.password,
          name: payload.name,
          role: payload.isAdmin
        },
        { withCredentials: true }
      )

        .then(response => {
          //Set UserData and LoggedIn then Route to homepage
          console.log("response:", response);
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
    const token = Cookies.get("token");

    Axios.post(host, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log("response:", response);
        //In /auth/me response comes with no token so we add it from cookies
        let userAuthData = { auth: true, data: response.data };
        userAuthData.data.token = Cookies.get("token");
        console.log("userAuthData:", userAuthData);
        dispatch("handleAuthStateChange", userAuthData);
      })

      .catch(error => {
        console.log("error:", error);
        // showErrorMessage(error.response.data.message);
        let userAuthData = { auth: false };
        dispatch("handleAuthStateChange", userAuthData);
      });
  },
  ////////////////////Check Logic////////////////////
  logoutUser({ dispatch }) {
    Loading.show();

    //Client-Side Logout
    let userAuthData = { auth: false };
    dispatch("handleAuthStateChange", userAuthData);

    let host = "/auth/logout";
    const token = Cookies.get("token");

    //Server-Side Logout
    Axios.get(host, {
      headers: {
        // Authorization: `Bearer ${token}`
      }
    })
      .then(() => {})

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
      if (this.$router.history.current.fullPath != "/") {
        this.$router.push("/");
      }
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
