import axios from 'axios'
// initial state
const state = {
  job: '',
  jobs: [],
  registeredJobs: [],
  filteredJobs: []
}

// getters
const getters = {
  job: (state) => {
    return state.job
  },
  jobs: (state) => {
    return state.jobs
  },
  registeredJobs: (state) => {
    return state.registeredJobs
  },
  filteredJobs: (state) => {
    return state.filteredJobs
  }
}
// mutations
const mutations = {
  setjob (state, job) {
    state.job = job
  },
  clearjob (state, job) {
    state.job = job
  },
  addjob (state, job) {
    state.jobs.push(job)
  },
  setjobs (state, jobs) {
    state.jobs = jobs
  },
  setregisteredjobs (state, registeredJobs) {
    state.registeredJobs = registeredJobs
  },
  setFilteredJobs (state, filteredJobs) {
    state.filteredJobs = filteredJobs
  }
}
// actions
const actions = {
  getJob ({ commit }, payload) {
    return axios
      .get('/api/jobs/' + payload)
      .then(function (response) {
        commit('setjob', response.data)
        return response.data
      })
  },
  filterJobsBySubject ({ commit }, payload) {
    return axios
      .get('/api/jobs/filtersubject/' + payload)
      .then(function (response) {
        commit('setFilteredJobs', response.data)
        return response.data
      })
  },
  getRegisteredJobs ({ commit }, payload) {
    return axios
      .get('/api/jobs/Registered/' + payload)
      .then(function (response) {
        commit('setregisteredjobs', response.data)
        return response.data
      })
  },
  setJob ({ commit }, payload) {
    commit('setjob', payload)
  },
  clearJob ({ commit }, payload) {
    commit('clearjob', payload)
  },
  addJob ({ commit }, payload) {
    return axios
      .post('/api/jobs/', payload)
      .then(function (response) {
        commit('addjob', response.data)
        return response.data
      })
  },
  bidForJob ({ commit }, payload) {
    return axios
      .post('/api/jobs/BidForJob', payload)
      .then(function (response) {
        return response.data
      })
  },
  editJob ({ commit }, payload) {
    return axios
      .put('/api/jobs/' + payload.id, payload)
      .then(function (response) {
        commit('setjob', response.data)
        return response.data
      })
  },
  deleteJob ({ commit }, payload) {
    return axios
      .delete('/api/jobs/' + payload.id)
      .then(function (response) {
        commit('setjobs', [])
        return response.data
      })
  },
  getJobs ({ commit }, payload) {
    return axios
      .get('/api/jobs/GetjobsByOrgId/' + payload)// should send the organization ID
      .then(function (response) {
        commit('setjobs', response.data)
        return response.data
      })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
