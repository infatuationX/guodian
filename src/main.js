import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
import './assets/font-awesome/css/font-awesome.min.css'
import axios from 'axios'
import qs from 'qs'

Vue.prototype.$qs = qs
axios.interceptors.request.use(config => {
  console.log(config)
  return config
})
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://121.36.111.65:8080/coal'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
