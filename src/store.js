import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import {state, mutations, actions, getters} from './vuex/index'
import Table from './vuex/table/table'
import Home from './vuex/home/index'
import Sign from './vuex/home/signin'
import Center from './vuex/home/center'
import Search from './vuex/search/search'

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules:{
    Table,
    Home,
    Sign,
    Center,
    Search,
  }
})
