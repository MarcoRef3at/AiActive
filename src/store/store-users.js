import config from "app/config/config";
import Vue from "vue";
import Axios from "axios";
import { Cookies, Loading, Notify } from "quasar";
import { showErrorMessage } from "src/functions/fn_ShowErrorMsg";

const state = {
  users: [],
  showAddUserModal: false,
  showEditUserModal: false,
  pagination: {
    limit: 40,
    page: 1
  }
};

const mutations = {
  addUser(state, user) {
    state.users.push(user);
  },
  updateUser(state, payload) {
    // get user index
    let userIndex = state.users.findIndex(x => x.id == payload.id);
    Vue.set(state.users, userIndex, payload);
  },
  deleteUser(state, userId) {
    let userIndex = state.users.findIndex(x => x.id == userId);
    Vue.delete(state.users, userIndex);
  },
  setAddUserModal(state, value) {
    state.showAddUserModal = value;
  },
  setEditUserModal(state, value) {
    state.showEditUserModal = value;
  },
  setPagination(state, value) {
    state.pagination = value;
  }
};

const actions = {
  getUsers({ dispatch }) {
    // Loading.show();
    setTimeout(() => {
      const limit = `npp=${state.pagination.limit}`;
      const page = `&page=${state.pagination.page}`;
      const host = config.API_URL + "/users?" + limit + page;
      const token = Cookies.get("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      };
      Axios.get(host, {
        headers: headers
      })
        .then(response => {
          // console.log("response:", response);
          let users = response.data.data;
          dispatch("handleStateUsers", users);
        })
        .catch(error => {
          console.log("error:", error);
          showErrorMessage(error.message);
        });
    }, 500);
  },
  setPagination({ commit }, payload) {
    commit("setPagination", payload);
  },
  addUser({ commit, dispatch }, payload) {
    Loading.show();
    setTimeout(() => {
      const host = config.API_URL + "/users";
      const token = Cookies.get("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      };
      console.log("payload:", payload);
      Axios.post(host, payload, {
        headers: headers
      })
        .then(response => {
          console.log("response.data:", response.data);
          commit("addUser", response.data.user);
          dispatch("setAddUserModal", false);
          Loading.hide();
          Notify.create("User Successfully Added!");
        })
        .catch(error => {
          // console.log(error.response.data.error);
          showErrorMessage(error.response.data.error);
        });
    }, 500);
  },

  // Update User
  updateUser({ commit, dispatch }, payload) {
    Loading.show();

    setTimeout(() => {
      const host = config.API_URL + "/users/" + payload.id;
      delete payload.created_at;
      delete payload.password;
      delete payload.id;
      const userToken = Cookies.get("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`
      };
      console.log("payload:", payload);

      Axios.put(host, payload, {
        headers: headers
      })
        .then(response => {
          commit("updateUser", payload);
          dispatch("setEditUserModal", false);
          Loading.hide();
          Notify.create("User Updated!");
        })
        .catch(error => {
          console.log(error.error);
          showErrorMessage(error.message);
        });
    }, 500);
  },
  deleteUser({ commit }, userId) {
    Loading.show();
    setTimeout(() => {
      const host = config.API_URL + "/users/" + userId;
      const userToken = Cookies.get("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`
      };
      Axios.delete(host, {
        headers: headers
      })
        .then(response => {
          commit("deleteUser", userId);
          Loading.hide();
          Notify.create("User Deleted!");
        })
        .catch(error => {
          console.log(error);
          showErrorMessage(error.message);
        });
    }, 500);
  },
  handleStateUsers({ commit, getters }, payload) {
    Loading.hide();
    payload.forEach(user => {
      // Commit only non-existing user with id
      if (!getters.user_id.includes(user.id)) commit("addUser", user);
    });
  },
  setAddUserModal({ commit }, value) {
    commit("setAddUserModal", value);
  },
  setEditUserModal({ commit }, value) {
    commit("setEditUserModal", value);
  }
};

const getters = {
  user_id: state => state.users.map(user => user.id),
  showAddUserModal: state => state.showAddUserModal,
  showEditUserModal: state => state.showEditUserModal
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
