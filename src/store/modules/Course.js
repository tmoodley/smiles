import axios from 'axios'
// initial state
const state = {
  course: '',
  courses: [],
  registeredCourses: []
}

// getters
const getters = {
  course: (state) => {
    return state.course
  },
  courses: (state) => {
    return state.courses
  },
  registeredCourses: (state) => {
    return state.registeredCourses
  }
}
// mutations
const mutations = {
  setCourse (state, course) {
    state.course = course
  },
  clearCourse (state, course) {
    state.course = course
  },
  addCourse (state, course) {
    state.courses.push(course)
  },
  setCourses (state, courses) {
    state.courses = courses
  },
  setregisteredCourses (state, registeredCourses) {
    state.registeredCourses = registeredCourses
  }
}
// actions
const actions = {
  getCourse ({ commit }, payload) {
    return axios
      .get('/api/Courses/' + payload)
      .then(function (response) {
        commit('setCourse', response.data)
        return response.data
      })
  },
  getRegisteredCourses ({ commit }, payload) {
    return axios
      .get('/api/Courses/Registered/' + payload)
      .then(function (response) {
        commit('setregisteredCourses', response.data)
        return response.data
      })
  },
  setCourse ({ commit }, payload) {
    commit('setCourse', payload)
  },
  clearCourse ({ commit }, payload) {
    commit('clearCourse', payload)
  },
  addCourse ({ commit }, payload) {
    return axios
      .post('/api/Courses/', payload)
      .then(function (response) {
        commit('addCourse', response.data)
        return response.data
      })
  },
  editCourse ({ commit }, payload) {
    return axios
      .put('/api/Courses/' + payload.id, payload)
      .then(function (response) {
        commit('setCourse', response.data)
        return response.data
      })
  },
  getCourses ({ commit }, payload) {
    return axios
      .get('/api/Courses/GetCoursesByOrgId/' + payload)// should send the organization ID
      .then(function (response) {
        commit('setCourses', response.data)
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
