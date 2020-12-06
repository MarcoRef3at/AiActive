import { LocalStorage, Loading, QSpinnerPie } from "quasar";
import { firebaseAuth } from "boot/firebase";
import { showErrorMessage } from "src/functions/fn_ShowErrorMsg";
import FeatureDataService from "../services/FeatureDataService";

function loading() {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: "blue",
    spinnerSize: 140,
    backgroundColor: "gery",
    message: "Some important process is in progress. Hang on...",
    messageColor: "black"
  });
}
const state = {
  LoggedIn: false,
  token: null
};
const mutations = {
  setLoggedIn(state, value) {
    state.LoggedIn = value;
  },
  setToken(state, value) {
    state.token = value;
  }
};
const actions = {
  registerUser({}, payload) {
    loading();
    // console.log(payload.name);
    FeatureDataService.register(payload)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        showErrorMessage(error.response.data.error);
      });
  },
  loginUser({}, payload) {
    loading();
    FeatureDataService.login(payload)
      .then(response => {
        console.log(response);
        this.state.token = response.data.token;
        console.log(this.state.token)
        Loading.hide();
      })
      .catch(error => {
        showErrorMessage(error.response.data.error);
      });
  },
  getAllBoot({}) {
    loading();
    FeatureDataService.getAllBoot()
      .then(response => {
        console.log(response);
        Loading.hide();
      })
      .catch(error => {
        showErrorMessage(error.response.data.error);
      });
  },
  // registerUser({}, payload) {
  //   loading();
  //   firebaseAuth
  //     .createUserWithEmailAndPassword(payload.email, payload.password)
  //     .then(response => {
  //       // console.log("response: ", response);
  //     })
  //     .catch(error => {
  //       showErrorMessage(error.message);
  //     });
  // },
  // loginUser({}, payload) {
  //   loading();

  //   firebaseAuth
  //     .signInWithEmailAndPassword(payload.email, payload.password)
  //     .then(response => {
  //       // console.log("response: ", response);
  //     })
  //     .catch(error => {
  //       showErrorMessage(error.message);
  //     });
  // },
  logoutUser() {
    loading();
    firebaseAuth.signOut();
  },
  // handleAuthStateChange({ commit }) {
  //   firebaseAuth.onAuthStateChanged(user => {
  //     Loading.hide();
  //     if (user) {
  //       commit("setLoggedIn", true);
  //       LocalStorage.set("loggedIn", true);
  //       this.$router.push("/");
  //     } else {
  //       commit("setLoggedIn", false);
  //       LocalStorage.set("loggedIn", false);

  //       this.$router.replace("/auth");
  //     }
  //   });
  // }
  handleAuthStateChange({ commit }) {
    if (this.state.token = null) {
      Loading.hide();
      commit("setLoggedIn", true);
      LocalStorage.set("loggedIn", true);
      this.$router.push("/");
    } else {
      commit("setLoggedIn", false);
      LocalStorage.set("loggedIn", false);

      this.$router.replace("/auth");
    }
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
