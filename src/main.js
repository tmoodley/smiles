import Vue from 'vue'
import 'mutationobserver-shim'
import './Utils/fliter'
import App from './App.vue'
import router from './router'
import store from './store'
import Raphael from 'raphael/raphael'
import './plugins'
import './registerServiceWorker'
import i18n from './i18n'
import axios from 'axios';

Vue.prototype.$http = axios;

import VueSweetalert2 from 'vue-sweetalert2'

import VueGAPI from 'vue-gapi'
 
import 'cropperjs/dist/cropper.css';

import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import VueAnalytics from 'vue-analytics'

import VueVirtualScroller from 'vue-virtual-scroller'

Vue.use(VueVirtualScroller)
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

// register globally
var infiniteScroll = require('vue-infinite-scroll');
Vue.use(infiniteScroll)

// Configuration VueAnalytics
Vue.use(VueAnalytics, {
  id: 'G-Z8M0BV0CHG', router
});

// create the 'options' object
const apiConfig = {
  apiKey: 'AIzaSyD7zgbVZU-XQTM8JquGNRg5AEh73Qg1T-Y',
  clientId: '830609015625-69ca1bor97b3oqbkutfl4ffkqe2s49fv.apps.googleusercontent.com',
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
  scope: "https://www.googleapis.com/auth/calendar",

  // works only with `ux_mode: "prompt"`
  refreshToken: true,
}

import 'sweetalert2/dist/sweetalert2.min.css'
import "vue-wysiwyg/dist/vueWysiwyg.css";
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import wysiwyg from 'vue-wysiwyg'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import Vue2Filters from 'vue2-filters'
import VueCurrencyInput from 'vue-currency-input'
import VueFilterDateFormat from 'vue-filter-date-format'
import Vuelidate from 'vuelidate'
import Clipboard from 'v-clipboard'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import Vue2Dropzone from 'vue2-dropzone' 
Vue.use(VueFilterDateFormat)
Vue.use(VueCurrencyInput)
Vue.use(Vue2Filters)
Vue.use(VueSweetalert2)
Vue.use(PerfectScrollbar)
Vue.use(wysiwyg, {}) // config is optional. more below
Vue.use(Vue2Dropzone) 
Vue.component('VueSlider', VueSlider) 
Vue.use(Vuelidate)
Vue.use(Clipboard)
// Registration of global components 
Vue.use(VueGAPI, apiConfig)
Vue.use(require('vue-moment'));


axios.interceptors.request.use(function (config) {
  let user = JSON.parse(localStorage.getItem('user')); 
  if (user != null) {
    config.headers.Authorization = 'Bearer ' + user.data.token;
  }

  return config;
})

axios.interceptors.response.use(undefined, function (err) {
  return new Promise(function (resolve, reject) {
    if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
      // if you ever get an unauthorized, logout the user
      this.$store.dispatch('authentication/logout')

      // you can also redirect to /login if needed !
    }
    throw err;
  });
});
 
var join = require('url-join');

// https://github.com/sindresorhus/is-absolute-url/blob/master/index.js#L7
var isAbsoluteURLRegex = /^(?:\w+:)\/\//;

axios.interceptors.request.use(function(config) {
  // Concatenate base path if not an absolute URL
  if ( !isAbsoluteURLRegex.test(config.url) ) {
    config.url = join('https://stuttie.com/', config.url);
  }

  return config;
});

global.Raphael = Raphael

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {

  const currentUser  = localStorage.getItem('user');
  const requiresAuth = to.matched.some(record => record.meta.auth);

  if (requiresAuth && !currentUser) {
    next('/login');
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

let vm = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

window.vm = vm
