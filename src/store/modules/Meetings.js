import axios from 'axios'

const state = {
  meeting: '',
  previousMeetings: [],
  meetings: [],
  todayMeetings: [],
  upcomingMeetings: [],
  meetingByDate: [],
  meetingLoading: false
}

// getters
const getters = {
  meeting: (state) => {
    return state.meeting
  },
  meetings: (state) => {
    return state.meetings
  },
  previousMeetings: (state) => {
    return state.previousMeetings
  },
  todayMeetings: (state) => {
    return state.todayMeetings
  },
  upcomingMeetings: (state) => {
    return state.upcomingMeetings
  },
  meetingByDate: (state) => {
    return state.meetingByDate
  },
  meetingLoading: (state) => {
    return state.meetingLoading
  }
}

// mutations
const mutations = {
  setMeeting (state, meeting) {
    state.meeting = meeting
  },
  setMeetings (state, meetings) {
    state.meetings = meetings
  },
  setPreviousMeetings (state, previousMeetings) {
    state.previousMeetings = previousMeetings
  },
  setTodayMeetings (state, todayMeetings) {
    state.todayMeetings = todayMeetings
    setTimeout(() => { state.meetingLoading = false }, 1500)
  },
  setUpcomingMeetings (state, upcomingMeetings) {
    state.upcomingMeetings = upcomingMeetings
    setTimeout(() => { state.meetingLoading = false }, 1500)
  },
  setMeetingsBydate (state, meetingsByDate) {
    state.meetingByDate = meetingsByDate
  },
  setMeetingmeetingLoading (state, meetingLoading) {
    state.meetingLoading = meetingLoading
  }
}

const actions = {
  getMeetings ({ commit }, payload) {
    return axios
      .get('/portal/api/Meetings/UpcomingMeetings?userId=' + payload)
      .then(function (response) {
        console.log(response.data)
        commit('setMeetings', response.data)
        return response.data
      })
  },
  getPrevious ({ commit }, payload) {
    return axios
      .get('/portal/api/Meetings/PreviousMeetings?userId=' + payload)
      .then(function (response) {
        console.log(response.data)
        commit('setPreviousMeetings', response.data)
        return response.data
      })
  },
  selectedMeeting ({ commit }, payload) {
    commit('setMeeting', payload)
  },
  getTodayMeeting ({ commit }, payload) {
    commit('setMeetingmeetingLoading', true)
    return axios
      .get('/portal/api/Meetings/TodayOrganizationMeetings?organizationId=' + payload)
      .then(function (response) {
        console.log(response.data)

        for (var meeting of response.data) {
          meeting.isLine = false
          meeting.isLast = false
          meeting.isDisabled = true
        }
        commit('setTodayMeetings', response.data)
        return response.data
      })
  },
  getUpcomingMeeting ({ commit }, payload) {
    commit('setMeetingmeetingLoading', true)
    return axios
      .get('/portal/api/Meetings/UpcomingOrganizationMeetings?organizationId=' + payload)
      .then(function (response) {
        console.log(response.data)
        commit('setUpcomingMeetings', response.data)
        return response.data
      })
  },
  getMeetingsByDate ({ commit }, payload) {
    return axios
      .get('/portal/api/Meetings/OrganizationMeetingsByDate?organizationId=' + payload.organizationId + '&date=' + payload.date + '&partnerId=' + payload.partnerId)
      .then(function (response) {
        console.log(response.data)
        commit('setMeetingsBydate', response.data)
        return response.data
      })
  },
  getMeetingsDeleted ({ commit }, payload) {
    return axios
      .get('/portal/api/Meetings/DeletedOrganizationMeetingsByDate?organizationId=' + payload.organizationId + '&date=' + payload.date + '&partnerId=' + payload.partnerId)
      .then(function (response) {
        commit('setMeetingsBydate', response.data)
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
