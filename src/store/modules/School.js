import axios from 'axios'
// initial state
const state = {
  schools: [],
  school: '',
  mode: ''
}

// getters
const getters = {
  mode: (state) => {
    return state.mode
  },
  school: (state) => {
    return state.school
  },
  schools: (state) => {
    return state.schools
  }
}
// mutations
const mutations = {
  setMode (state, mode) {
    state.mode = mode
  },
  setSchool (state, school) {
    state.school = school
  },
  setSchools (state, schools) {
    state.schools = schools
  }
}
// actions
const actions = {
  getSchoolAdminByOrg ({ commit }, payload) {
    return axios
      .get('/api/Schools/GetSchoolAdminByOrg/' + payload)
      .then(function (response) {
        commit('setSchool', response.data)
        localStorage.setItem('schoolId', response.data.id)
        return response.data
      })
  },
  getSchoolByOrg ({ commit }, payload) {
    return axios
      .get('/api/Schools/GetSchoolByOrg/' + payload)
      .then(function (response) {
        commit('setSchool', response.data)
        localStorage.setItem('schoolId', response.data.id)
        return response.data
      })
  },
  findSchoolsByCountryId ({ commit }, payload) {
    return axios
      .get('/api/Schools/FindSchoolsByCountryId/' + payload)
      .then(function (response) {
        commit('setSchools', response.data)
        return response.data
      })
  },
  findSchools ({ commit }, payload) {
    return axios
      .get('/api/Schools/FindSchools/' + payload.countryId + '/' + payload.name)
      .then(function (response) {
        commit('setSchools', response.data)
        return response.data
      })
  },
  addMemberToSchool ({ commit }, payload) {
    return axios
      .get('/api/Schools/AddMemberToSchool/' + payload.schoolId + '/' + payload.organizationId)
      .then(function (response) {
        commit('setSchool', response.data)
        return response.data
      })
  },
  addSchool ({ commit }, payload) {
    return axios
      .post('/api/Schools/', payload)
      .then(function (response) {
        commit('setSchool', response.data)
        return response.data
      })
  },
  updateSchool ({ commit }, payload) {
    return axios
      .put('/api/Schools/' + payload.id, payload)
      .then(function (response) {
        commit('setSchool', payload)
        return response.data
      })
  },
  setMode ({ commit }, payload) {
    commit('setMode', payload)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
