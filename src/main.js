import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vuetify'
import VeeValidate from 'vee-validate'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
//import VueResource from 'vue-resource'
import App from './App.vue'
import router from './router'
import store from './store/store'
import '../public/style.css'
import './registerServiceWorker'
import auth from '@/auth'
import Axios from 'axios';
library.add(faSignOutAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(auth)
Vue.use(VeeValidate);

//Vue.use(VueResource);
//Vue.http.options.root = "https://80uim6qgpb.execute-api.ap-south-1.amazonaws.com/dev/"
//const base_URL = "https://80uim6qgpb.execute-api.ap-south-1.amazonaws.com/dev/"
//const axios = require('axios')
Vue.prototype.$baseURL = 'https://80uim6qgpb.execute-api.ap-south-1.amazonaws.com/dev/'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
//  module.exports = {
//    baseURL: 'https://80uim6qgpb.execute-api.ap-south-1.amazonaws.com/dev/'
//  }
//axios.defaults.baseURL = 'https://80uim6qgpb.execute-api.ap-south-1.amazonaws.com/dev/'
