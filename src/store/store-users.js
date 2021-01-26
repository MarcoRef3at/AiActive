// import config from "@/../config/config";
// import Vue from "vue";
// import Axios from "axios";
// import { LocalStorage, Loading, Notify } from "quasar";
// import { showErrorMessage } from "src/functions/function-show-error-message";

const state = {
  users: [
    {
      id: 1,
      name: "Baher Elnaggar",
      email: "baher@aiactive.com",
      role: "admin",
      status: true
    },
    {
      id: 2,
      name: "Ahmed Helmy",
      email: "ahme@aiactive.com",
      role: "admin",
      status: true
    },
    {
      id: 3,
      name: "Sara H.",
      email: "sara@aiactive.com",
      role: "user",
      status: false
    }
  ],
  showAddUserModal: false,
  showEditUserModal: false
};

const mutations = {
  // addUser(state, user) {
  //   state.users.push(user);
  // },
  // updateUser(state, payload) {
  //   // get user index
  //   let userIndex = state.users.findIndex(x => x.id == payload.id);
  //   Vue.set(state.users, userIndex, payload);
  // },
  // deleteUser(state, userId) {
  //   let userIndex = state.users.findIndex(x => x.id == userId);
  //   Vue.delete(state.users, userIndex);
  // },
  setAddUserModal(state, value) {
    state.showAddUserModal = value;
  },
  setEditUserModal(state, value) {
    state.showEditUserModal = value;
  }
};

const actions = {
  // getUsers({ dispatch }) {
  //   Loading.show();
  //   setTimeout(() => {
  //     const host = config.API_URL + "/users";
  //     const userToken = LocalStorage.getItem("loggedInUserToken");
  //     const headers = {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${userToken}`
  //     };
  //     Axios.get(host, {
  //       headers: headers
  //     })
  //       .then(response => {
  //         let users = response.data;
  //         dispatch("handleStateUsers", users);
  //       })
  //       .catch(error => {
  //         showErrorMessage(error.message);
  //       });
  //   }, 500);
  // },
  // addUser({ commit, dispatch }, payload) {
  //   Loading.show();
  //   setTimeout(() => {
  //     const host = config.API_URL + "/users";
  //     const userToken = LocalStorage.getItem("loggedInUserToken");
  //     const headers = {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${userToken}`
  //     };
  //     Axios.post(host, payload, {
  //       headers: headers
  //     })
  //       .then(response => {
  //         commit("addUser", response.data.user);
  //         dispatch("setAddUserModal", false);
  //         Loading.hide();
  //         Notify.create("User Successfully Added!");
  //       })
  //       .catch(error => {
  //         console.log(error);
  //         showErrorMessage(error.message);
  //       });
  //   }, 500);
  // },
  // updateUser({ commit, dispatch }, payload) {
  //   Loading.show();
  //   setTimeout(() => {
  //     const host = config.API_URL + "/users/" + payload.id;
  //     const userToken = LocalStorage.getItem("loggedInUserToken");
  //     const headers = {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${userToken}`
  //     };
  //     Axios.put(host, payload, {
  //       headers: headers
  //     })
  //       .then(response => {
  //         commit("updateUser", payload);
  //         dispatch("setEditUserModal", false);
  //         Loading.hide();
  //         Notify.create("User Updated!");
  //       })
  //       .catch(error => {
  //         console.log(error);
  //         showErrorMessage(error.message);
  //       });
  //   }, 500);
  // },
  // deleteUser({ commit }, userId) {
  //   Loading.show();
  //   setTimeout(() => {
  //     const host = config.API_URL + "/users/" + userId;
  //     const userToken = LocalStorage.getItem("loggedInUserToken");
  //     const headers = {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${userToken}`
  //     };
  //     Axios.delete(host, {
  //       headers: headers
  //     })
  //       .then(response => {
  //         commit("deleteUser", userId);
  //         Loading.hide();
  //         Notify.create("User Deleted!");
  //       })
  //       .catch(error => {
  //         console.log(error);
  //         showErrorMessage(error.message);
  //       });
  //   }, 500);
  // },
  // handleStateUsers({ commit, getters }, payload) {
  //   Loading.hide();
  //   payload.forEach(user => {
  //     // Commit only non-existing user with id
  //     if (!getters.user_id.includes(user.id)) commit("addUser", user);
  //   });
  // },
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
