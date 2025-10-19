import axios from 'axios'
// initial state
const state = {
  friends: [],
  searchResults: [],
  friendRequests: [],
  friend: '',
  mode: '',
  query: '',
  filterType: ''
}

// getters
const getters = {
  mode: (state) => {
    return state.mode
  },
  friend: (state) => { 
    return state.friend
  }, 
  searchResults: (state) => {
    return state.searchResults
  }, 
  friends: (state) => {
    return state.friends
  }, 
  friendRequests: (state) => {
    return state.friendRequests
  }, 
  query: (state) => {
    return state.query
  },
  filterType: (state) => {
    return state.filterType
  },
}
// mutations
const mutations = {
  setMode(state, mode) {
    state.mode = mode
  },
  setQuery(state, query) {
    state.query = query
  },
  setFilter(state, filterType) {
    state.filterType = filterType
  },
  setfriend(state, friend) {
    state.friend = friend
  },
  setfriends(state, friends) {
    //filter frined and remove current user from list
    var organizationId = JSON.parse(localStorage.getItem('organizationId'));
    state.friends = friends.filter(item => item.userId !== organizationId);
  }, 
  setSearchResults(state, searchResults) {
    state.searchResults = searchResults
  }, 
  setFriendRequests(state, friendRequests) {
    state.friendRequests = friendRequests
  },
  removefriend(state, friend) { 
    var index = state.friends.findIndex(x => x.friendId === friend.friendId && x.organizationId === friend.organizationId);
    state.friends.splice(index, 1);
  },
  removeFriendRequest(state, friend) { 
   // var index = state.friendRequests.findIndex(x => x.friendId === friend.friendId && x.organizationId === friend.organizationId);
   //condition is updated becuase we font have friend.organizationId
   var index = state.friendRequests.findIndex(x => x.organizationId === friend.friendId);
   state.friendRequests.splice(index, 1);
  },
  addfriends(state, friend) {
    state.friends.push(friend)
  },
}
// actions
const actions = {
  getUsersByFilter({ commit }, payload) {
    commit('setFilter', "getUsersByFilter");
    commit('setQuery', payload);
    return axios
      .get('/portal/api/Organization/UsersFilter/' + payload)
      .then(function (response) {
        commit('setSearchResults', response.data);
        commit('setMode', 'find');
        return response.data;
      })
  },
  getUsers({ commit }) {
    return axios
      .get('/portal/api/Organization/')
      .then(function (response) {
        commit('setfriends', response.data);
        commit('setMode', 'find');
        return response.data;
      })
  },
  filterGender({ commit }, payload) {
    commit('setGenders', payload.gender);
    return axios
      .get('/portal/api/Organization/TutorsFilterGender/?subjectId=' + payload.subjectId + '&gender=' + payload.gender)
      .then(function (response) {
        commit('setSearchResults', response.data);
        commit('setMode', 'find');
        return response.data;
      })
  },
  filterUserGender({ commit }, payload) {
    commit('setFilter', "filterUserGender");
    commit('setQuery', payload);
    commit('setGenders', payload.gender);
    return axios
      .get('/portal/api/Organization/UsersFilterGender/?subjectId=' + payload.subjectId + '&gender=' + payload.gender)
      .then(function (response) {
        commit('setSearchResults', response.data);
        commit('setMode', 'find');
        return response.data;
      })
  },
  filterUserByName({ commit }, payload) {
    commit('setFilter', "filterUserByName");
    commit('setQuery', payload);
    return axios
      .get('/portal/api/Organization/GetUsersByName/' + payload)
      .then(function (response) {
        commit('setSearchResults', response.data);
        commit('setMode', 'find');
        return response.data;
      })
  },
  filterUserByEmail({ commit }, payload) {
    commit('setFilter', "filterUserByEmail");
    commit('setQuery', payload);
    return axios
      .get('/portal/api/Organization/GetUsersByEmail/' + payload)
      .then(function (response) {
        commit('setSearchResults', response.data);
        commit('setMode', 'find');
        return response.data;
      })
  },
  getFriends({ commit }, payload) {
    return axios
      .get('/portal/api/OrganizationFriends/' + payload)
      .then(function (response) {
        console.log(response.data)
        commit('setfriends', response.data);
        commit('setMode', 'all');
        return response.data;
      })
  },
  getFriendRequests({ commit }, payload) {
    return axios
      .get('/portal/api/OrganizationFriends/Requests/' + payload)
      .then(function (response) {
        commit('setFriendRequests', response.data);
        commit('setMode', 'requests');
        return response.data;
      })
  },
  getFriendSuggestions({ commit }, payload) {
    return axios
      .get('/portal/api/OrganizationFriends/Suggestions/' + payload)
      .then(function (response) {
        commit('setfriends', response.data);
        commit('setMode', 'suggestions');
        return response.data;
      })
  },
  getfriendByOrg({ commit }, payload) {
    return axios
      .get('/api/friends/GetfriendByOrg/' + payload)
      .then(function (response) {
        commit('setfriend', response.data);
        localStorage.setItem('friendId', response.data.id);
        return response.data;
      })
  },
  findfriendsByCountryId({ commit }, payload) {
    return axios
      .get('/api/friends/FindfriendsByCountryId/' + payload)
      .then(function (response) {
        commit('setfriends', response.data);
        return response.data;
      })
  },
  findfriends({ commit }, payload) {
    return axios
      .get('/api/friends/Findfriends/' + payload.countryId + '/' + payload.name)
      .then(function (response) {
        commit('setfriends', response.data);
        return response.data;
      })
  }, 
  addMemberTofriend({ commit }, payload) {
    return axios
      .get('/api/friends/AddMemberTofriend/' + payload.friendId + "/" + payload.organizationId)
      .then(function (response) {
        commit('setfriend', response.data);
        return response.data;
      })
  },
  addFriend({ commit }, payload) {
    return axios
      .post('/portal/api/OrganizationFriends/AddFriend', payload)
      .then(function (response) {
       // commit('addfriends', response.data);
       //removed because response.data is empty so due to this empty object was added, therefore removed it
        commit('setMode','added');
        return response.data;
      })
  },
  approveFriend({ commit }, payload) {
    return axios
      .post('/portal/api/OrganizationFriends/Approve', payload)
      .then(function (response) {
        commit('removeFriendRequest', payload); 
        //commit('addfriends', response.data);
        //removed because response.data is empty so due to this empty object was added, therefore removed it
        return response.data;
      })
  },
  removeFriend({ commit }, payload) {
    return axios
      .post('/portal/api/OrganizationFriends/Remove', payload)
      .then(function (response) {
        commit('removeFriendRequest', payload);
        return response.data;
      })
  },
  setMode({ commit }, payload) {
    commit('setMode', payload);
  }, 
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
