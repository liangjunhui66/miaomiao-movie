import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import axios from 'axios'
//连个全局组件 分别是滑动组件和加载组件
import Scroller from '@/components/Scroller'
Vue.component('Scroller', Scroller)

import Loading from '@/components/Loading'
Vue.component('Loading', Loading)

Vue.filter('setWH', (msg) => {
  var str1 = msg.substring(0,22);
  var str2 = msg.substring(25);
  return str1 + '128.180' + str2;
//   return msg.replace('w.h', '128.180');
  
})

Vue.prototype.axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
