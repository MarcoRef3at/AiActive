import { Notify } from "quasar";
import JWT from "jwt-client";
import { Axios } from "boot/axios";
import { Cookies } from "quasar";

export function login_register(state, payload) {
  let self = this;

  setTimeout(() => {
    //payload.status = login or register
    let host = `/auth/${payload.status}`;

    Axios.post(host, payload.body)

      .then(response => {
        let responseData = JWT.read(response.data.token).claim;
        state.commit("setUserData", responseData);
        const token = response.data.token;
        Axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        state.dispatch("setToken", {
          token: token,
          rememberMe: payload.rememberMe
        });
        self.$router.replace("/");
      })

      .catch(error => {
        //todo: check error
        console.log("error:", error.response.data.error);
        Notify(error.response.data.error);
      });
  }, 500);
}

export function setToken(state, data) {
  const headers = {
    Authorization: `Bearer ${data.token}`
  };
  Axios.defaults.headers.common["Authorization"] = headers;
  if (data.rememberMe) {
    Cookies.set("token", data.token, {
      expires: 365
    });
  } else {
    Cookies.set("token", data.token);
  }
}

export async function isLoggedIn(state) {
  const token = Cookies.get("token");
  const headers = { Authorization: `Bearer ${token}` };
  let host = "/auth/me";
  if (token) {
    return Axios.post(host, {}, { headers: headers })

      .then(response => {
        state.commit("setUserData", response.data.data);
      })

      .catch(error => {
        //todo: check error
        console.log("error:", error.response.data.error);
        // Notify(error.response.data.error);

        //Client-Side Logout
        state.dispatch("logoutUser");
      });
  } else {
    state.dispatch("logoutUser");
  }
}
export function logoutUser(state) {
  //Server-Side Logout
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`
  };
  let host = "/auth/logout";
  Axios.get(host, {}, { headers: headers }).catch(error => {
    Notify("Failed To Logout from the server");
  });

  //Client-Side Logout
  Cookies.remove("token");
  state.commit("setUserData", null);
  this.$router.push("/auth");
}