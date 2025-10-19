import axios from 'axios'
// initial state
const state = {
  admin: '',
  admins: []
}

const getters = {
  admin: (state) => {
    return state.admin
  },
  admins: (state) => {
    return state.admins
  }
}

const actions = {
  getAdmin ({ commit }, payload) {
    return axios
      .get('/portal/api/Admins')
      .then(function (response) {
        commit('setAdmins', response.data)
        return response.data
      })
  },
  getAdmins ({ commit }, payload) {
    console.log('axios' + payload)
    return axios
      .get('/portal/api/Admins/' + payload)
      .then(function (response) {
        commit('setAdmins', response.data)
        return response.data
      })
  }
}

// mutations
const mutations = {
  setAdmin (state, admin) {
    state.admin = admin
  },
  setAdmins (state, admins) {
    state.admins = admins
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
