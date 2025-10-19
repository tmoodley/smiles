import axios from 'axios'

const state = {
  message: '',
  unreadMessages: [],
  messages: [],
  contact: '',
  selectedContact: '',
  contacts: [],
  searchContacts: [],
  searchCompanies: [],
  todayMessages: [],
  upcomingMessages: [],
  messageByDate: [],
  messageLoading: false
}

// getters
const getters = {
  message: (state) => {
    return state.message
  },
  messages: (state) => {
    return state.messages
  },
  unreadMessages: (state) => {
    return state.unreadMessages
  },
  contact: (state) => {
    return state.contact
  },
  selectedContact: (state) => {
    return state.selectedContact
  },
  contacts: (state) => {
    return state.contacts
  },
  searchContacts: (state) => {
    return state.searchContacts
  },
  searchCompanies: (state) => {
    return state.searchCompanies
  }
}

// mutations
const mutations = {
  setMessage (state, message) {
    state.messages.push(message)
  },
  setMessages (state, messages) {
    state.messages = messages
  },
  setUnreadMessages (state, unreadMessages) {
    state.unreadMessages = unreadMessages
  },
  setSelectedContact (state, contact) {
    state.selectedContact = contact
  },
  setContact (state, contact) {
    state.contacts.push(contact)
  },
  setContacts (state, contacts) {
    state.contacts = contacts
  },
  selectContact (state, contact) {
    state.contact = contact
  },
  setSearchContacts (state, contacts) {
    state.searchContacts = contacts
  },
  setSearchCompanies (state, companies) {
    state.searchCompanies = companies
  }
}

const actions = {
  getMessages ({ commit }, payload) {
    return axios
      .get('/api/Messages/Organization/' + payload.id + '/From/' + payload.fromId + '/Recipient/' + payload.recipientId)
      .then(function (response) {
        commit('setMessages', response.data)
        return response.data
      })
  },
  getUnreadMessages ({ commit }, payload) { 
    return axios
      .get('/api/Messages/Unread/' + payload)
      .then(function (response) {
        commit('setUnreadMessages', response.data)
        return response.data
      })
  },
  getContacts ({ commit }, payload) {
    return axios
      .get('/api/MessageHistories/Organization/' + payload)
      .then(function (response) {
        commit('setContacts', response.data)
        return response.data
      })
  },
  getContact ({ commit }, payload) {
    return axios
      .get('/portal/api/Organization/Handle/' + payload)
      .then(function (response) {
        // commit('setContact', response.data);
        return response.data
      })
  },
  addMessage ({ commit }, payload) {
    commit('setMessage', payload)
  },
  sendMessage ({ commit }, payload) {
    return axios
      .post('/api/Messages/', payload)
      .then(function (response) {
        commit('setMessage', response.data)
        return response.data
      })
  },
  saveHistory ({ commit }, payload) {
    return axios
      .post('/api/MessageHistories/', payload)
      .then(function (response) {
        commit('setContact', response.data)
        return response.data
      })
  },
  selectContact ({ commit }, payload) {
    commit('selectContact', payload)
  },
  setSelectedContact ({ commit }, payload) {
    commit('setSelectedContact', payload)
  },
  filterContacts ({ commit }, payload) {
    return axios
      .get('/portal/api/Organization/Search/' + payload.filter + '/Handle/' + payload.handle)
      .then(function (response) {
        commit('setSearchContacts', response.data)
        return response.data
      })
  },
  filterCompanies ({ commit }, payload) {
    return axios
      .get('/portal/api/Organization/SearchCompanies/' + payload.filter + '/Handle/' + payload.handle)
      .then(function (response) {
        commit('setSearchCompanies', response.data)
        return response.data
      })
  },
  clearCompanies ({ commit }) {
    commit('setSearchCompanies', [])
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
