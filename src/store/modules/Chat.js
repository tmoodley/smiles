import axios from 'axios'
// initial state
const state = {
  participants: [],
  messages: [],
  rooms: [],
  room: ''
}

// getters
const getters = {
  room: (state) => {
    return state.room
  },
  rooms: (state) => {
    return state.rooms
  },
  messages: (state) => {
    return state.messages
  },
  participants: (state) => {
    return state.participants
  }
}
// mutations
const mutations = {
  setRoom (state, room) {
    state.room = room
  },
  setRooms (state, rooms) {
    state.rooms = rooms
  },
  setMessages (state, messages) {
    state.messages = messages
  },
  addMessage (state, message) {
    state.messages.push(message)
  },
  setParticipants (state, participants) {
    state.participants = participants
  },
  addParticipants (state, participant) {
    state.participants.push(participant)
  }
}
// actions
const actions = {
  getMessages ({ commit }, payload) {
    return axios
      .get('/portal/api/ChatMessages/' + payload)
      .then(function (response) {
        commit('setMessages', response.data)
        return response.data
      })
  },
  selectRoom ({ commit }, payload) { 
    commit('setRoom', payload)
  },
  getRoom ({ commit }, payload) {
    return axios
      .get('/api/ChatRoom/' + payload)
      .then(function (response) {
        commit('setRoom', response.data)
        return response.data
      })
  },
  getRooms ({ commit }) {
    return axios
      .get('/api/chatrooms/')
      .then(function (response) {
        commit('setRooms', response.data)
        return response.data
      })
  },
  addRoom ({ commit }, payload) {
    return axios
      .post('/api/chatrooms/', payload)
      .then(function (response) {
        commit('setRoom', response.data)
        return response.data
      })
  },
  addMessage ({ commit }, payload) {
    commit('addMessage', payload)
  },
  clearMessages ({ commit }) {
    commit('setMessages', [])
  },
  addParticipants ({ commit }, payload) {
    commit('setParticipants', payload)
  },
  addParticipant ({ commit }, payload) {
    commit('addParticipant', payload)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
