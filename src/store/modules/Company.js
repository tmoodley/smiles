
import axios from 'axios'
// initial state
const state = {
  company: [],
  tutors: [],
  users: [],
  genders: ['f', 'm']
}

// getters
const getters = {
  company: (state) => {
    return state.company
  },
  tutors: (state) => {
    return state.tutors
  },
  users: (state) => {
    return state.users
  },
  genders: (state) => {
    return state.genders
  }
}

// actions
const actions = {
  getTutors ({ commit }) {
    return axios
      .get('/portal/api/Organization/Tutors')
      .then(function (response) {
        commit('setTutors', response.data)
        return response.data
      })
  },
  getTutorsByFilter ({ commit }, payload) {
    return axios
      .get('/portal/api/Organization/TutorsFilter/' + payload)
      .then(function (response) {
        commit('setTutors', response.data)
        return response.data
      })
  },
  getStudentsByFilter ({ commit }, payload) {
    return axios
      .get('/portal/api/Organization/StudentsFilter/' + payload)
      .then(function (response) {
        commit('setUsers', response.data)
        return response.data
      })
  },
  getStudents ({ commit }) {
    return axios
      .get('/portal/api/Organization/Students')
      .then(function (response) {
        commit('setUsers', response.data)
        return response.data
      })
  },
  filterStudentGender ({ commit }, payload) {
    commit('setGenders', payload.gender)
    return axios
      .get('/portal/api/Organization/StudentsFilterGender/?subjectId=' + payload.subjectId + '&gender=' + payload.gender)
      .then(function (response) {
        commit('setUsers', response.data)
        return response.data
      })
  },
  getApplicants ({ commit }, payload) {
    return axios
      .get('/api/Jobs/Applicants/' + payload)
      .then(function (response) {
        commit('setUsers', response.data)
        return response.data
      })
  },
  getUsersByFilter ({ commit }, payload) {
    return axios
      .get('/portal/api/Organization/UsersFilter/' + payload)
      .then(function (response) {
        commit('setUsers', response.data)
        return response.data
      })
  },
  getUsers ({ commit }) {
    return axios
      .get('/portal/api/Organization/')
      .then(function (response) {
        commit('setUsers', response.data)
        return response.data
      })
  },
  filterGender ({ commit }, payload) {
    commit('setGenders', payload.gender)
    return axios
      .get('/portal/api/Organization/TutorsFilterGender/?subjectId=' + payload.subjectId + '&gender=' + payload.gender)
      .then(function (response) {
        commit('setTutors', response.data)
        return response.data
      })
  },
  filterUserGender ({ commit }, payload) {
    commit('setGenders', payload.gender)
    return axios
      .get('/portal/api/Organization/UsersFilterGender/?subjectId=' + payload.subjectId + '&gender=' + payload.gender)
      .then(function (response) {
        commit('setUsers', response.data)
        return response.data
      })
  },
  filterUserByName ({ commit }, payload) {
    return axios
      .get('/portal/api/Organization/GetUsersByName/' + payload)
      .then(function (response) {
        commit('setUsers', response.data)
        return response.data
      })
  },
  filterUserByEmail ({ commit }, payload) {
    return axios
      .get('/portal/api/Organization/GetUsersByEmail/' + payload)
      .then(function (response) {
        commit('setUsers', response.data)
        return response.data
      })
  },
  getCompany ({ commit }, payload) {
    return axios
      .get('/portal/api/Organization/' + payload)
      .then(function (response) {
        commit('setCompany', response.data)
        return response.data
      })
  },
  updateCompany ({ commit }, payload) {
    return axios
      .put('/portal/api/Organization/' + payload.userId, payload)
      .then(response => {
        commit('setCompany', response.data)
        return response.data
      })
  },
  addSubject ({ commit }, payload) {
    return axios
      .post('/portal/api/organization/subject', payload)
      .then(function (response) {
        commit('addSubject', response.data)
        return response.data
      })
  },
  removeSubject ({ commit }, payload) {
    return axios
      .get('/portal/api/organization/deletesubject/?organizationId=' + payload.organizationId + '&subjectId=' + payload.subjectId)
      .then(function (response) {
        commit('removeSubject', payload.subjectId)
        return response.data
      })
  },
  addTopic ({ commit }, payload) {
    return axios
      .post('/portal/api/organization/topic', payload)
      .then(function (response) {
        commit('addTopic', response.data)
        return response.data
      })
  },
  removeTopic ({ commit }, payload) {
    return axios
      .get('/portal/api/organization/deletetopic/?organizationId=' + payload.organizationId + '&topicId=' + payload.topicId)
      .then(function (response) {
        commit('removeTopic', payload.topicId)
        return response.data
      })
  },
  addLanguage ({ commit }, payload) {
    return axios
      .post('/portal/api/organization/Language', payload)
      .then(function (response) {
        commit('addLanguage', response.data)
        return response.data
      })
  },
  removeLanguage ({ commit }, payload) {
    return axios
      .get('/portal/api/organization/deletelanguage/?organizationId=' + payload.organizationId + '&languageId=' + payload.languageId)
      .then(function (response) {
        commit('removeLanguage', payload.languageId)
        return response.data
      })
  },
  findAvailableTutor ({ commit }, payload) {
    return axios
      .get('/api/rooms/findAvailableTutor/' + payload)
      .then(function (response) {
        commit('setUsers', response.data)
        return response.data
      })
  },
  requestTutorBySubject ({ commit }, payload) {
    return axios
      .get('/api/rooms/requestTutorBySubject/' + payload)
      .then(function (response) {
        commit('setUsers', response.data)
        return response.data
      })
  },
  requestTutorByTopic ({ commit }, payload) {
    return axios
      .get('/api/rooms/requestTutorByTopic/' + payload)
      .then(function (response) {
        commit('setUsers', response.data)
        return response.data
      })
  }

}

// mutations
const mutations = {
  setCompany (state, company) {
    state.company = company
  },
  setGenders (state, genders) {
    state.genders = [genders]
  },
  setUsers (state, users) {
    state.users = users
  },
  setTutors (state, tutors) {
    state.tutors = tutors
  },
  addSubject (state, subject) {
    if (state.company.organizationSubjects == null) {
      state.company.organizationSubjects = []
    }
    var organizationSubject = {
      SubjectId: subject.id,
      OrganizationId: state.company.id
    }
    state.company.organizationSubjects.push(organizationSubject)
  },
  removeSubject (state, subjectId) {
    var index = state.company.organizationSubjects.indexOf(x => x.id === subjectId)
    state.company.organizationSubjects.splice(index, 1)
  },
  addTopic (state, topic) {
    if (state.company.organizationTopics == null) {
      state.company.organizationTopics = []
    }
    var organizationTopic = {
      TopicId: topic.id,
      OrganizationId: state.company.id
    }
    state.company.organizationTopics.push(organizationTopic)
  },
  removeTopic (state, topicId) {
    var index = state.company.organizationTopics.indexOf(x => x.id === topicId)
    state.company.organizationTopics.splice(index, 1)
  },
  addLanguage (state, language) {
    if (state.company.organizationLanguages == null) {
      state.company.organizationLanguages = []
    }
    var organizationLanguage = {
      LanguageId: language.id,
      OrganizationId: state.company.id
    }
    state.company.organizationLanguages.push(organizationLanguage)
  },
  removeLanguage (state, languageId) {
    var index = state.company.organizationLanguages.indexOf(x => x.id === languageId)
    state.company.organizationLanguages.splice(index, 1)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
