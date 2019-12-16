// import Vue from 'vue'
// import axios from 'axios'
import router from '../router'
import store from "../store"
import { Message } from 'element-ui';
import VueCookies from 'vue-cookies';
// Vue.prototype.$http = axios


if (process.env.NODE_ENV == "development") {
  if (window.location.host == '192.168.1.195:8080') {
    axios.defaults.baseURL = 'https://pre-api.dazuhang.com'
  } else {
    axios.defaults.baseURL = 'http://192.168.1.195/tp5/public';
  }
} else if (process.env.NODE_ENV == "production") {
  axios.defaults.baseURL = window.location.protocol + "//yangzhiyuan.top/tp5/public"
}
axios.defaults.timeout = 20000;
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

//在main.js设置全局的请求次数，请求的间隙
axios.defaults.retry = 1;
axios.defaults.retryDelay = 1000;

//http request 封装请求头拦截器
axios.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  if (response.data) {
    if (response.data.code != 0) {
      Message.error({ message: response.data.msg, duration: 0 })
      return Promise.reject(response.data.msg)
    }
    return response.data
  } else {
    Message.error("接口没有返回值")
    return Promise.reject("接口没有返回值")
  }
}, function axiosRetryInterceptor(err) {
  var config = err.config;
  // If config does not exist or the retry option is not set, reject
  if (!config || !config.retry) return Promise.reject(err);

  // Set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0;

  // Check if we've maxed out the total number of retries
  if (config.__retryCount >= config.retry) {
    // Reject with the error
    return Promise.reject(err);
  }

  // Increase the retry count
  config.__retryCount += 1;

  // Create new promise to handle exponential backoff
  var backoff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, config.retryDelay || 1);
  });

  // Return the promise in which recalls axios to retry the request
  return backoff.then(function () {
    return axios(config);
  });
});

export default axios;