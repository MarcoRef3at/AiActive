// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)

// const state = {

// };
// const mutations = {

// };
// const actions = {
//   loginUser({dispatch}, payload) {
// 		Loading.show()
// 		setTimeout(() => {
// 			return new Promise((resolve, reject) => {
// 				let host = config.API_URL + '/login'

// 				Axios.post(host, {
// 					email: payload.email,
// 					password: payload.password
// 				})
// 					.then(response => {
// 						let userAuthData = response.data
// 						dispatch('handleAuthStateChange', userAuthData)
// 					})
// 					.catch(error => {

// 						if (error.message == 'Network Error'){
// 							showErrorMessage('Server Offline')
// 							return
// 						}

// 						if(error.response.status === 401) {
// 							showErrorMessage(error.response.data.message)
// 							return
// 						}
// 						else if(error.response.status === 404) {
// 							showErrorMessage(error.response.data.message)
// 							return
// 						}
// 					})
// 			})
// 		}, 500);
// 	},
// };
// export default new Vuex.Store({
//   state,
//   mutations,
//   actions,
// })
