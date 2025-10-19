import axios from 'axios'

const state = {
  post: '',
  posts: [],
  subjects: [],
  languages: [],
  channels: [],
  channel: '',
  rooms: [],
  grades: [],
  searchrooms: [],
  room: '',
  topic: '',
  meetingLoading: false,
  subject: '',
  user: '',
  org: '',
  roomDetails:{}
}

// getters
const getters = {
  user: (state) => {
    return state.user
  },
  post: (state) => {
    return state.post
  },
  posts: (state) => {
    return state.posts
  },
  subjects: (state) => {
    return state.subjects
  },
  languages: (state) => {
    return state.languages
  },
  subject: (state) => {
    return state.subject
  },
  channels: (state) => {
    return state.channels
  }, 
  channel: (state) => {
    return state.channel
  },
  rooms: (state) => {
    return state.rooms
  }, 
  searchrooms: (state) => {
    return state.searchrooms
  },
  room: (state) => {
    return state.room
  },
  topic: (state) => {
    return state.topic
  },
  meetingLoading: (state) => {
    return state.meetingLoading
  },
  grades: (state) => {
    return state.grades
  }, 
  org: (state) => {
    return state.org
  },
  roomDetails: (state) => {
    return state.roomDetails
  },
}

// mutations
const mutations = {
  setNewPost(state, post) {
    state.posts.unshift(post)
  },
  setDeletePost(state, post) {
    //find post
    var index = state.posts.findIndex(x => x.id === post.id);
    //remove post
    state.posts.splice(index, 1);
  },
  setLikePost(state, like) {
    //find post
    var index = state.posts.findIndex(x => x.id === like.postsId);
    //get the post to update
    var post = state.posts[index];
    //add like to post
    post.likes.push(like);
    //replace post
    state.posts[index] = post;
  },
  setCommentUpVote(state, comment) {
    debugger;
    //find post
    var index = state.posts.findIndex(x => x.id === comment.PostsId);
    //get the post to update
    var post = state.posts[index];
    //find comment
    var index2 = post.comments.findIndex(x => x.id === comment.CommentId);
    //add like to post
    post.comments[index2].upVotes.push(comment);
    //replace post
    state.posts[index] = post;
  },
  setCommentDownVote(state, comment) {
    //find post
    var index = state.posts.findIndex(x => x.id === comment.PostsId);
    //get the post to update
    var post = state.posts[index];
    //find comment
    var index2 = post.comments.findIndex(x => x.id === comment.CommentId);
    //add like to post
    post.comments[index2].downVotes.push(comment);
    //replace post
    state.posts[index] = post;
  },
  setCommentPost(state, comment) {
    //find post
    var index = state.posts.findIndex(x => x.id === comment.postsId);
    //get the post to update
    var post = state.posts[index];
    //add like to post
    post.comments.push(comment);
    //replace post
    state.posts[index] = post;
  },
  setUnLikePost(state, like) {
    //find post
    var index = state.posts.findIndex(x => x.id === like.PostsId);
    //get the post to update
    var post = state.posts[index];
    //get the index for the like
    var likeindex = post.likes.findIndex(x => x.id === like.id);
    //add like to post
    post.likes.splice(likeindex,1);
    //replace post
    state.posts[index] = post;
  },
  setPosts(state, posts) {
    state.posts = posts
  },
  addPosts(state, posts) {
    state.posts.push(...posts)
  },
  setPost(state, post) {
    state.post = post
  },
  setSubjects(state, subjects) {
    state.subjects = subjects
  },
  setLanguages(state, languages) {
    state.languages = languages
  },
  setSubject(state, subject) {
    state.subject = subject
  },
  setChannels(state, channels) {
    state.room.channels = channels
  },
  setChannel(state, channel) {
    state.channel = channel
  },
  setForumChannels(state, channels) {
    state.channels = channels
  },
  setRooms(state, rooms) {
    state.rooms = rooms
  },
  setSearchRooms(state, searchrooms) {
    state.searchrooms = searchrooms
  },
  setRoom(state, room) {
    state.room = room
  },
  setGrades(state, grades) {
    state.grades = grades
  },
  setTopic(state, topic) {
    state.topic = topic
  },
  setUser(state, user) {
    state.user = user
  },
  setOrg(state, org) {
    state.org = org
  },
  setRoomDetails(state, room) {
    state.roomDetails = room
  },
}

const actions = {
  getPosts({ commit }) { 
    commit('setPosts', []);
    return axios
      .get('/api/Posts/')
      .then(function (response) {
        commit('setPosts', response.data);
        return response.data;
      })
  },
  getPost({ commit }, payload) {
    return axios
      .get('/api/Posts/' + payload)
      .then(function (response) {
        commit('setPost', response.data);
        return response.data;
      })
  },
  getOrgByHandle({ commit }, payload) {
    return axios
      .get('/portal/api/Organization/OrgHandle/' + payload)
      .then(function (response) {
        commit('setOrg', response.data);
        return response.data;
      })
  },
  getPostsByUser({ commit }, payload) {
    return axios
      .get('/api/Posts/User/' + payload)
      .then(function (response) {
        commit('setPosts', response.data);
        return response.data;
      })
  },
  getPostsBySubject({ commit }, payload) {
    return axios
      .get('/api/Posts/Subject/' + payload)
      .then(function (response) {
        commit('setPosts', response.data);
        return response.data;
      })
  }, 
  getPostsBySubjectPage({ commit }, payload) {
    return axios
      .get('/api/Posts/Subject/' + payload.subjectId + '?CurrentPage=' + payload.page)
      .then(function (response) {
        commit('addPosts', response.data);
        return response.data;
      })
  },
  getPostsByTopicPage({ commit }, payload) {
    return axios
      .get('/api/Posts/Topic/' + payload.topicId + '?CurrentPage=' + payload.page)
      .then(function (response) {
        commit('addPosts', response.data);
        return response.data;
      })
  },
  getFilterPosts({ commit }, payload) { 
    return axios
      .post('/api/Posts/Filter/', payload)
      .then(function (response) {
        commit('setPosts', response.data);
        return response.data;
      })
  },
  getSchoolPostsBySubject({ commit }, payload) {
    return axios
      .get('/api/Posts/school/' + payload.schoolId + '/subject/' + payload.subjectId)
      .then(function (response) {
        commit('setPosts', response.data);
        return response.data;
      })
  },
  getPostsByCourse({ commit }, payload) { 
    commit('setPosts', []);
    return axios
      .get('/api/Posts/Course/' + payload)
      .then(function (response) {
        commit('setPosts', response.data);
        return response.data;
      })
  },
  getPostsByRoom({ commit }, payload) { 
    commit('setPosts', []);
    return axios
      .get('/api/Posts/Room/' + payload.id)
      .then(function (response) {
        commit('setPosts', response.data);
        return response.data;
      })
  },
  getPostsByChannel({ commit }, payload) {
    commit('setChannel', payload);
    commit('setPosts', []);
    return axios
      .get('/api/Posts/Channel/' + payload)
      .then(function (response) {
        commit('setPosts', response.data);
        return response.data;
      })
  },
  getPostsByChannelPage({ commit }, payload) {
    return axios
      .get('/api/Posts/Channel/' + payload.channelId + '?page=' + payload.page)
      .then(function (response) {
        commit('addPosts', response.data);
        return response.data;
      })
  },
  getSchoolPostsByRoom({ commit }, payload) {
    commit('setPosts', []);
    return axios
      .get('/api/Posts/School/' + payload.schoolId + '/Room/' + payload.roomId)
      .then(function (response) {
        commit('setPosts', response.data);
        return response.data;
      })
  },
  getSchoolPostsByChannel({ commit }, payload) {
    commit('setChannel', payload);
    commit('setPosts', []);
    return axios
      .get('/api/Posts/School/' + payload.schoolId + 'Channel/' + payload.channelId)
      .then(function (response) {
        commit('setPosts', response.data);
        return response.data;
      })
  },
  getPostsByTopic({ commit }, payload) { 
    commit('setPosts', []);
    return axios
      .get('/api/Posts/Topic/' + payload)
      .then(function (response) {
        commit('setPosts', response.data);
        return response.data;
      })
  },
  getSchoolPostsByTopic({ commit }, payload) {
    commit('setPosts', []);
    return axios
      .get('/api/Posts/School/' + payload.schoolId + '/Topic/' + payload.topicId)
      .then(function (response) {
        commit('setPosts', response.data);
        return response.data;
      })
  },
  createPost({ commit }, payload) {
    return axios
      .post('/api/Posts/', payload)
      .then(function (response) {
        commit('setNewPost', response.data);
        return response.data;
      })
  },
  deletePost({ commit }, payload) {
    return axios
      .delete('/api/Posts/' + payload.id)
      .then(function (response) {
        commit('setDeletePost', payload);
        return response.data;
      })
  },
  commentPost({ commit }, payload) {
    return axios
      .post('/api/Comments/', payload)
      .then(function (response) {
        commit('setCommentPost', response.data);
        return response.data;
      })
  },
  upVoteComment({ commit }, payload) {
    return axios
      .post('/api/UpVotes/', payload)
      .then(function (response) {
        commit('setCommentUpVote', payload);
        return response.data;
      })
  },
  downVoteComment({ commit }, payload) {
    return axios
      .post('/api/DownVotes/', payload)
      .then(function (response) {
        commit('setCommentDownVote', payload);
        return response.data;
      })
  },
  likePost({ commit }, payload) {
    return axios
      .post('/api/Likes/', payload)
      .then(function (response) {
        commit('setLikePost', response.data);
        return response.data;
      })
  },
  unLikePost({ commit }, payload) {
    return axios
      .delete('/api/Likes/' + payload.id)
      .then(function (response) {
        commit('setUnLikePost', payload);
        return response.data;
      })
  },
  getSubjects({ commit }) {
    return axios
      .get('/api/Subjects/')
      .then(function (response) {
        commit('setSubjects', response.data);
        return response.data;
      })
  },
  getLanguages({ commit }) {
    return axios
      .get('/api/Languages/')
      .then(function (response) {
        commit('setLanguages', response.data);
        return response.data;
      })
  },
  getChannels({ commit }, payload) { 
    return axios
      .get('/api/Channels/Room/' + payload)
      .then(function (response) {
        commit('setChannels', response.data);
        return response.data;
      })
  },
  getCourseChannels({ commit }, payload) {
    return axios
      .get('/api/Channels/Course/' + payload)
      .then(function (response) {
        commit('setChannels', response.data);
        return response.data;
      })
  },
  getSearchRooms({ commit }, payload) {
    return axios
      .get('/api/rooms/')
      .then(function (response) {
        commit('setSearchRooms', response.data);
        return response.data;
      })
  },
  searchRoomsByTopic({ commit }, payload) {
    return axios
      .get('/api/rooms/topic/' + payload)
      .then(function (response) {
        commit('setSearchRooms', response.data);
        return response.data;
      })
  },
  searchRoomsBySubject({ commit }, payload) {
    return axios
      .get('/api/rooms/subject/' + payload)
      .then(function (response) {
        commit('setSearchRooms', response.data);
        return response.data;
      })
  },
  searchRoomsById({ commit }, payload) {
    return axios
      .get('/api/rooms/RoomId/' + payload)
      .then(function (response) {
        commit('setSearchRooms', response.data);
        return response.data;
      })
  },
  getRooms({ commit }, payload) {
    return axios
      .get('/api/rooms/organization/' + payload)
      .then(function (response) {
        commit('setRooms', response.data);
        return response.data;
      })
  },
  getSchoolRooms({ commit }, payload) {
    return axios
      .get('/api/rooms/school/' + payload)
      .then(function (response) {
        commit('setRooms', response.data);
        return response.data;
      })
  },
  addRoom({ commit }, payload) {
    return axios
      .post('/api/rooms/', payload)
      .then(function (response) {
        commit('setRoom', response.data);
        return response.data;
      })
  },
  getRoom({ commit }, payload) {
    return axios
      .get('/api/rooms/' + payload)
      .then(function (response) {
        commit('setRoom', response.data);
        return response.data;
      })
  }, 
  requestRoom({ commit }, payload) {
    return axios
      .get('/api/rooms/Request/' + payload.organizationId + '/Room/' + payload.roomId)
      .then(function (response) { 
        return response.data;
      })
  },
  addMemberToRoom({ commit }, payload) {
    return axios
      .post('/api/rooms/RoomMembers', payload)
      .then(function (response) {
        commit('addMemberRoom', response.data);
        return response.data;
      })
  },
  addRoomUser({ commit }, payload) {
    return axios
      .get('/api/rooms/addmember/?organizationId=' + payload.organizationId + '&roomId=' + payload.roomId)
      .then(function (response) {
        return response.data;
      })
  },
  addRoomDocument({ commit }, payload) {
    return axios
      .post('/api/rooms/document', payload)
      .then(function (response) {
        return response.data;
      })
  },
  removeRoomDocument({ commit }, payload) {
    return axios
      .get('/api/rooms/document/' + payload)
      .then(function (response) {
        return response.data;
      })
  },
  removeRoomUser({ commit }, payload) {
    return axios
      .get('/api/rooms/deletemember/?organizationId=' + payload.organizationId + '&roomId=' + payload.roomId)
      .then(function (response) { 
        return response.data;
      })
  },
  approveRoomUser({ commit }, payload) {
    return axios
      .get('/api/rooms/approvemember/?organizationId=' + payload.organizationId + '&roomId=' + payload.roomId)
      .then(function (response) {
        return response.data;
      })
  },
  editRoom({ commit }, payload) {
    return axios
      .put('/api/rooms/' + payload.id, payload)
      .then(function (response) {
        commit('setRoom', response.data);
        return response.data;
      })
  },
  addChannel({ commit }, payload) {
    return axios
      .post('/api/channels/', payload)
      .then(function (response) {
        commit('setChannel', response.data);
        return response.data;
      })
  },
  selectRoom({ commit }, payload) {
    commit('setRoom', payload);
  }, 
  setRoomDetails({ commit }, payload) {
    commit('setRoomDetails', payload);
  }, 
  selectChannel({ commit }, payload) {
    commit('setChannel', payload);
  },
  selectTopic({ commit }, payload) {
    commit('setTopic', payload);
  },
  saveSubject({ commit }, payload) {
    commit('setPosts', []); 
    commit('setSubject', payload);
  }, 
  selectUser({ commit }, payload) {
    commit('setUser', payload);
  },
  getForumCourses({ commit }) {
    return axios
      .get('/api/channels/')
      .then(function (response) {
        commit('setForumChannels', response.data);
        return response.data;
      })
  },
  getGrades({ commit }) {
    return axios
      .get('/api/Grades')
      .then(response => {
        commit('setGrades', response.data);
      });
  },  
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
