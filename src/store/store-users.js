import { Axios } from "boot/axios";
import { Loading } from "quasar";
import { showErrorMessage } from "src/functions/fn_ShowErrorMsg";
import { Cookies } from "quasar";
import config from "app/config/config";

const token = Cookies.get("token");
const headers = {
  Authorization: `Bearer ${token}`
};
const state = {
  users: []
};

const mutations = {};

const actions = {
  getUsers() {
    Loading.show();

    setTimeout(() => {
      const host = config.API_URL + "/users";

      Axios.get(host, {
        headers: headers
      })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          showErrorMessage(error.message);
        });
    }, 500);
    Loading.hide();
  },

  updateUser({}, payload) {
    console.log("payload:", payload);
    Loading.show();

    setTimeout(() => {
      const host = config.API_URL + `/users/${payload.id}`;
      console.log("payload:", payload);
      Axios.put(host, payload, {
        headers: headers
      })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log("error:", error.response.data);
          showErrorMessage(error.response.data.error);
        });
    }, 500);

    Loading.hide();
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
