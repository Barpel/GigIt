import Vue from 'vue'
import Vuex from 'vuex'
import gigModule from '../store/gigStore'
import userModule from './userStore'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {

  },
  actions: {
  },
  modules: {
    gigModule,
    userModule,
  }
})
