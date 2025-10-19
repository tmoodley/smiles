import { userService } from '../../_services'
import router from '../../router/index'
const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null }

export const authentication = {
  namespaced: true,
  state: initialState,
  actions: {
    login ({ dispatch, commit }, { email, password }) {
      commit('loginRequest', { email })
      return userService.login(email, password)
        .then(
          user => {
            commit('loginSuccess', user)
            return true;
          },
          error => {
            commit('loginFailure', error)
            return false;
          }
        )
    },
    logout ({ commit }) {
      userService.logout()
      commit('logout') 
      //router.push('login')
    }
  },
  mutations: {
    loginRequest (state, user) {
      state.status = { loggingIn: true }
      state.user = user
    },
    loginSuccess (state, user) {
      state.status = { loggedIn: true }
      state.user = user
    },
    loginFailure (state) {
      state.status = {}
      state.user = null
    },
    logout (state) {
      state.status = {}
      state.user = null
    }
  }
}
