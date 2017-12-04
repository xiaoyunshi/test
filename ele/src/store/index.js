import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import header from './modules/header'
import * as actions from './actions'

Vue.use(Vuex)

const state = {
  classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    header
  }
})
