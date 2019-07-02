import Vue from 'vue'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router.js'
import VueResource from 'vue-resource'
import Moment from 'moment'





Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)

Vue.prototype.$moment = Moment;//赋值使用
Vue.http.options.root = 'http://127.0.0.1:8899/v1/';
Vue.http.options.emulateJSON = true;
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
