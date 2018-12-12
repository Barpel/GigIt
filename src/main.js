import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store/store'
// import bus from './eventBus.js'
import VueSocketIO from 'vue-socket.io'
import axios from 'axios'
import './registerServiceWorker'

import './scss/main.scss'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import * as VueGoogleMaps from 'vue2-google-maps'
import cloudinary from 'cloudinary-core'
axios.defaults.withCredentials = true;

const SOCKET_URL = process.env.NODE_ENV !== 'development'
  ? ''
  : '//localhost:3001'


Vue.use(VueGoogleMaps, {
  load: {
    // key: "aaaaAAIzaSyD4xBjgA3NAoLiVoJmSwJCYUel6lc17HOM",
    libraries: "places" // necessary for places input
  }
});

Vue.use(new VueSocketIO({
  debug: true,
  connection: SOCKET_URL,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },

}))

Vue.use(ElementUI, { locale });
Vue.config.productionTip = false


new Vue({
  router,
  store,
  VueGoogleMaps,
  render: h => h(App)
}).$mount('#app')
