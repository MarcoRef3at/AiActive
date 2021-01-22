import { axiosInstance } from 'boot/axios'
import { Cookies } from 'quasar'

const REGISTER_ROUTE = '/api/v1/auth/register'
const VERIFICATION_ROUTE = '/auth/verify'
const LOGIN_ROUTE = '/api/v1/auth/login'
const FETCH_USER_ROUTE = '/api/v1/auth/me'
const PASSWORD_FORGOT_ROUTE = '/auth/password/forgot'
const PASSWORD_RESET_ROUTE = '/auth/password/reset'

export function login_register(state , payload) {
  let self = this
  setTimeout(() => {
    //payload.status = login or register
    let host = `/api/v1/auth/${payload.status}`;
    axiosInstance.post(host, payload.body)

      .then(response => {


        //dispatch handleAuthStateChange
        state.commit('setUser', response.data)
        const token = response.data.token
        axiosInstance.defaults.headers.common['Authorization'] =
          'Bearer ' + token
        state.dispatch('setToken', {
          token: token,
          rememberMe: payload.rememberMe
        })
        self.$router.replace('/account')
      })

      .catch(error => {
          // showNotif(error.response.data.error);
          console.log(error);
      })
      .finally(() => {
        console.log('final action')
      });
  }, 500);
}

export function register (state, data) {
  return axiosInstance.post(REGISTER_ROUTE, data)
}

export function login (state, data) {
  // console.log('login data', data.body)
  let self = this
  const p = new Promise(function (resolve, reject) {
    return axiosInstance
      .post(LOGIN_ROUTE, data.body)
      .then(response => {
        console.log('login response: ', response.data)
        state.commit('setUser', response.data)
        const token = response.data.token
        axiosInstance.defaults.headers.common['Authorization'] =
          'Bearer ' + token
        state.dispatch('setToken', {
          token: token,
          rememberMe: data.rememberMe
        })
        self.$router.replace('/account')
        resolve()
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 401) {
            console.log('auth.login.verification_required')
            // this.$q.dialog({
            //   message: this.$t('auth.login.verification_required')
            // })
          } else if (error.response.status === 403) {
            console.log('auth.login.invalid_credentials')
            // this.$q.dialog({
            //   message: this.$t('auth.login.invalid_credentials')
            // })
          } else {
            console.error(error)
          }
        }
        reject(error)
      }).finally(() => {
        console.log('final action')
      })
  })
  return p
}

export function setToken (state, data) {
  axiosInstance.defaults.headers.common['Authorization'] =
    'Bearer ' + data.token
  if (data.rememberMe) {
    Cookies.set('authorization_token', data.token, {
      expires: 365
    })
  } else {
    Cookies.set('authorization_token', data.token)
  }
}

export async function fetch (state) {
  var token = Cookies.get('authorization_token')
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token
    return axiosInstance.post(FETCH_USER_ROUTE).then(response => {
      state.commit('setUser', response.data.data)
    })
  } else {
    state.dispatch('logout')
  }
}

export function logout (state) {
  Cookies.remove('authorization_token')
  state.commit('setUser', null)
  this.$router.push('/auth')
}

export function verify (state, token) {
  return axiosInstance.get(VERIFICATION_ROUTE + '?token=' + token)
}
export function passwordForgot (state, data) {
  return axiosInstance.post(PASSWORD_FORGOT_ROUTE, data)
}

export function passwordReset (state, { token, data }) {
  return axiosInstance.post(PASSWORD_RESET_ROUTE + '?token=' + token, data)
}