// initial state
const state = {
  isOnBoarding: false
}

const getters = {
  isOnBoarding: (state) => {
    return state.isOnBoarding
  }
}

const actions = {
  changeIsOnBoarding ({ commit }, payload) {
    commit('setIsOnBoardin', payload)
  }
}

// mutations
const mutations = {
  setIsOnBoardin (state, admin) {
    state.isOnBoarding = admin
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
