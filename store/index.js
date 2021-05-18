import Vuex from 'vuex'
import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields'
import * as modules from './modules'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
console.log((global))
export default new Vuex.Store({
  modules: {
      ...modules
  },
  strict: debug,
  //plugins: debug ? [createLogger()] : []
})