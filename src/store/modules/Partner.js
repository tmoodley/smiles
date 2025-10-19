import axios from "axios";
// initial state
const state = {
  partner: "",
  partners: []
};

// getters
const getters = {
  partner: state => {
    return state.partner;
  },
  partners: state => {
    return state.partners;
  }
};
// mutations
const mutations = {
  setPartner(state, partner) {
    state.partner = partner;
  },
  setPartners(state, partners) {
    state.partners = partners;
  }
};
// actions
const actions = {
  getPartner({ commit }, payload) {
    return axios
      .get("/portal/api/Customers/GetCustomerByID?id=" + payload)
      .then(function(response) {
        commit("setPartner", response.data);
        return response.data;
      });
  },
  getPartners({ commit }, payload) {
    return axios
      .get("/api/Customers/GetCustomersById/" + payload) // should send the organization ID
      .then(function(response) {
        commit("setPartners", response.data);
        return response.data;
      });
  },
  updatePartner({ commit }, payload) {
    return axios
      .put("/portal/api/Customers/" + payload.Id, payload)
      .then(response => {
        commit("setPartner", response.data);
        return response.data;
      });
  },
  updatePartnerById({ commit }, payload) {
    return axios
      .put("/portal/api/Customers/" + payload.organizationId, payload)
      .then(response => {
        commit("setPartner", response.data);
        return response.data;
      });
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
