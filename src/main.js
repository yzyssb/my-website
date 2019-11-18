// import Vue from 'vue'
import App from './App'

import VueCookies from 'vue-cookies'

import VueAwesomeSwiper from 'vue-awesome-swiper'

import router from './router'
import store from './store'//引入store

//vue-lazyload图片懒加载
import VueLazyload from 'vue-lazyload'

import axios from './api/api.js'
import Cors from 'cors'
import VueAxios from 'vue-axios'
import MetaInfo from 'vue-meta-info'

Vue.use(MetaInfo)

import "babel-polyfill";

Vue.prototype.$axios = axios // 全局注册，使用方法为:this.$axios
axios.defaults.withCredentials = false//请求是否携带cookie

Vue.use(VueAwesomeSwiper)
Vue.use(VueAxios,axios)

Vue.config.productionTip = false
Vue.use(VueCookies)
Vue.use(Cors)
Vue.use(VueLazyload)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})