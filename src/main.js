import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/assets/style/base.scss'
import '../src/utils/element'
import '../src/assets/style/font/iconfont.css';
import $http from '@/utils/axios'
import {_g} from '@/utils/global'

Vue.config.productionTip = false
window.$store = store
window.$http = $http

window.rootPath = '/admin'
// window.rootPath = '/api.php/'

window.$img = 'http://192.168.10.119/ndxy1/public'
// window.$img = 'http://yypt.ambcon.cn/Public/'

window.$router = router
window._g = _g
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
