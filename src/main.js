import Vue from 'vue'
import Vuex from 'vuex'
import api from './assets/js/api'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(api, Vuex)
Vue.use(ElementUI, { locale })


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
