import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store/store'
import bus from './eventBus.js'
import axios from 'axios'
import VueSocketIO from 'vue-socket.io'
import './registerServiceWorker'


import './scss/main.scss'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'

axios.defaults.withCredentials = true;

Vue.use(ElementUI, { locale });
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://metinseylan.com:1992',
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  }
}))

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
