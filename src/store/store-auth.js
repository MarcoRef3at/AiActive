import { firebaseAuth } from 'boot/firebase'

const state = {};
const mutations = {};
const actions = {
    registerUser({},payload){
        firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
            console.log('response: ',response)

        })
        .catch(error =>{
            console.log('error.message: ',error.message)
        })
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
