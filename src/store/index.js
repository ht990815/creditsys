import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import peimission from './modules/permission'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    peimission
  }
})
export default store;
