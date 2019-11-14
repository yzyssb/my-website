// import Vue from 'vue';
// import Vuex from 'vuex';
import routerStatus from './modules/routerStatus';
import userOrMerchant from './modules/userOrMerchant';
// Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    routerStatus,
    userOrMerchant
  }
});