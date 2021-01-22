import { Notify } from 'quasar'
import { axiosInstance } from './axios'
import auth from '../store/auth'
import enUS from '../i18n/en-us/auth'
/* eslint-disable no-use-before-define */

import { jsonapiModule } from 'jsonapi-vuex'

/* eslint-enable no-use-before-define */
function isArrayOrString (variable) {
  if (typeof variable === typeof [] || typeof variable === typeof '') {
    return true
  }
  return false
}

export default ({ app, router, store, Vue }) => {
  axiosInstance.interceptors.response.use((response) => {
    return response
  }, (error) => {
    if (!error.response) {
      Notify.create({
        message: app.i18n.t('auth.network_error'),
        color: 'red'
      })
    }
    return Promise.reject(error)
  })

  /**
   * Register i18n
   */
  app.i18n.mergeLocaleMessage('en-us', enUS)

  /**
   * Register auth store
   */
  store.registerModule('auth', auth)

  store.registerModule('jv', jsonapiModule(axiosInstance, { preserveJson: true }))

  /**
   * Set route guard
   */
  router.beforeEach((to, from, next) => {
    const record = to.matched.find(record => record.meta.auth)
    console.log('rec:',record);
    if (record) {
      store.dispatch('auth/fetch').then(() => {
        console.log('router fetch')
        if (!store.getters['auth/loggedIn']) {
          router.push('/login')
        } else if (
          isArrayOrString(record.meta.auth) &&
          !store.getters['auth/check'](record.meta.auth)
        ) {
          router.push('/account')
        }
      })
    }
    next()
  })

  store.dispatch('auth/fetch').catch(() => {
    store.dispatch('auth/logout')
  })

  var helper = {}
  helper.register = (data) => { return store.dispatch('auth/register', data) }
  helper.loggedIn = () => { return store.getters['auth/loggedIn'] }
  helper.check = (roles) => { return store.getters['auth/check'](roles) }
  helper.login = async (data) => { return store.dispatch('auth/login', data) }
  helper.setToken = (token) => { return store.dispatch('auth/setToken', token) }
  helper.logout = () => { return store.dispatch('auth/logout') }
  helper.verify = (token) => { return store.dispatch('auth/verify', token) }
  helper.passwordForgot = (data) => { return store.dispatch('auth/passwordForgot', data) }
  helper.passwordReset = (data) => { return store.dispatch('auth/passwordReset', data) }
  helper.fetch = () => { return store.dispatch('auth/fetch') }
  helper.user = () => { return store.getters['auth/user'] }
  Vue.prototype.$auth = helper
}
