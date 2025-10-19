import axios from 'axios'

const state = {
  alert: '',
  previousAlerts: [],
  alerts: [],
  todayAlerts: [],
  upcomingAlerts: [],
  alertByDate: [],
  alertLoading: false
}

// getters
const getters = {
  alert: (state) => {
    return state.alert
  },
  alerts: (state) => {
    return state.alerts
  },
  previousAlerts: (state) => {
    return state.previousAlerts
  },
  todayAlerts: (state) => {
    return state.todayAlerts
  },
  upcomingAlerts: (state) => {
    return state.upcomingAlerts
  },
  alertByDate: (state) => {
    return state.alertByDate
  },
  alertLoading: (state) => {
    return state.alertLoading
  }
}

// mutations
const mutations = {
  setalert (state, alert) {
    state.alert = alert
  },
  setAlerts (state, alerts) {
    state.alerts = alerts
  },
  removeAlert (state, alert) {
    // find alert
    var index = state.alerts.findIndex(x => x.id === alert.id)
    // remove alert
    state.alerts.splice(index, 1)
  },
  setPreviousAlerts (state, previousAlerts) {
    state.previousAlerts = previousAlerts
  },
  setTodayAlerts (state, todayAlerts) {
    state.todayAlerts = todayAlerts
    setTimeout(() => { state.alertLoading = false }, 1500)
  },
  setUpcomingAlerts (state, upcomingAlerts) {
    state.upcomingAlerts = upcomingAlerts
    setTimeout(() => { state.alertLoading = false }, 1500)
  },
  setAlertsBydate (state, AlertsByDate) {
    state.alertByDate = AlertsByDate
  },
  setalertalertLoading (state, alertLoading) {
    state.alertLoading = alertLoading
  }
}

const actions = {
  getAlerts ({ commit }, payload) {
    return axios
      .get('/api/Alerts/Organization/' + payload)
      .then(function (response) {
        commit('setAlerts', response.data)
        return response.data
      })
  },
  markAlertAsRead ({ commit }, payload) {
    return axios
      .delete('/api/Alerts/' + payload.id)
      .then(function (response) {
        commit('removeAlert', response.data)
        return response.data
      })
  },
  getPrevious ({ commit }, payload) {
    return axios
      .get('/api/Alerts/PreviousAlerts?userId=' + payload)
      .then(function (response) {
        console.log(response.data)
        commit('setPreviousAlerts', response.data)
        return response.data
      })
  },
  selectedalert ({ commit }, payload) {
    commit('setalert', payload)
  },
  getTodayalert ({ commit }, payload) {
    commit('setalertalertLoading', true)
    return axios
      .get('/api/Alerts/TodayOrganizationAlerts?organizationId=' + payload)
      .then(function (response) {
        console.log(response.data)

        for (var alert of response.data) {
          alert.isLine = false
          alert.isLast = false
          alert.isDisabled = true
        }
        commit('setTodayAlerts', response.data)
        return response.data
      })
  },
  getUpcomingalert ({ commit }, payload) {
    commit('setalertalertLoading', true)
    return axios
      .get('/api/Alerts/UpcomingOrganizationAlerts?organizationId=' + payload)
      .then(function (response) {
        console.log(response.data)
        commit('setUpcomingAlerts', response.data)
        return response.data
      })
  },
  getAlertsByDate ({ commit }, payload) {
    return axios
      .get('/api/Alerts/OrganizationAlertsByDate?organizationId=' + payload.organizationId + '&date=' + payload.date + '&partnerId=' + payload.partnerId)
      .then(function (response) {
        console.log(response.data)
        commit('setAlertsBydate', response.data)
        return response.data
      })
  },
  getAlertsDeleted ({ commit }, payload) {
    return axios
      .get('/api/Alerts/DeletedOrganizationAlertsByDate?organizationId=' + payload.organizationId + '&date=' + payload.date + '&partnerId=' + payload.partnerId)
      .then(function (response) {
        console.log(response.data)
        commit('setAlertsBydate', response.data)
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
