import { Loading } from "quasar";
import { showErrorMessage } from "src/functions/fn_ShowErrorMsg";
import JWT from "jwt-client";
import { Axios } from "boot/axios";
import { Cookies } from "quasar";

const token = Cookies.get("token");
const headers = {
  Authorization: `Bearer ${token}`
};

export function login_register({ dispatch }, payload) {
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
        dispatch("handleAuthStateChange", response.data);
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
}
export function isLoggedIn({ dispatch }) {
  let host = "/auth/me";

  Axios.post(host, {}, { headers: headers })

    .then(response => {
      //In /auth/me response comes with no token so we add it from cookies
      response.data.token = Cookies.get("token");
      dispatch("handleAuthStateChange", response.data);
    })

    .catch(error => {
      showErrorMessage(error.response.data.error);

      //Client-Side Logout
      dispatch("handleAuthStateChange", { success: false });
    });
}
export function logoutUser({ dispatch }) {
  Loading.show();

  //Client-Side Logout
  dispatch("handleAuthStateChange", { success: false });

  let host = "/auth/logout";

  //Server-Side Logout
  Axios.get(host, {}, { headers: headers }).catch(error => {
    showErrorMessage("Failed To Logout from the server");
    console.log("error:", error);
  });
}
export function handleAuthStateChange({ commit }, payload) {
  Loading.hide();

  // LOGIN If success is True & User Status is not Disabled
  if (payload.success && JWT.read(payload.token).claim) {
    commit("setLoggedIn", payload);
    commit("setUserData", JWT.read(payload.token).claim);

    /*--------------------------------------------------
      todo: leave routings to the router-auth
            to remember the desiered path before login and redirects to it
            */
    //
    if (this.$router.history.current.fullPath != "/") {
      console.log("this.$router:", this.$router.history);
      this.$router.push("/");
      // console.log("this.$router:", this.$router);
      // this.$router.go(-1);
    }
  } else {
    commit("setLoggedIn", false);
    commit("setUserData", false);
    if (this.$router.history.current.fullPath != "/auth") {
      console.log("this.$router:", this.$router);
      this.$router.replace("/auth");
    }
  }
}
export function handleBootUserAuth({ dispatch }) {
  // todo : check senario again
  console.log("Store Started");
  //If There's a token in cookies validate it from the server
  if (Cookies.has("token")) {
    dispatch("isLoggedIn");
  }
}
