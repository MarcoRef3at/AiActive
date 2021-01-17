import Vue from "vue";
import Vuex from "vuex";
import auth from "./store-auth";
import users from "./store-users";
Vue.use(Vuex);
export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      users
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  });
  // add this so that we export store
  return Store;
}
// add this line to access store wherever you need
