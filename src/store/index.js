import Vue from 'vue'
import Vuex from 'vuex'
import Setting from './Setting/index'
import company from './modules/Company'
import partner from './modules/Partner'
import admins from './modules/Admin'
import meeting from './modules/Meetings'
import onboarding from './modules/onBoarding'
import { alert } from './modules/alert.module'
import { authentication } from './modules/authentication'
import { users } from './modules/users.module'
import posts from './modules/Posts'
import alerts from './modules/Alert'
import messages from './modules/Message'
import chat from './modules/Chat'
import course from './modules/Course'
import school from './modules/School'
import job from './modules/Job'
import friend from './modules/Friend'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    Setting,
    company,
    partner,
    alert,
    authentication,
    users,
    admins,
    meeting,
    onboarding,
    posts,
    alerts,
    messages,
    chat,
    course,
    school,
    job,
    friend
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  strict: debug
})
