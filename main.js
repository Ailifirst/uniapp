import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
Vue.config.productionTip = false
import store from './store'
App.mpType = 'app'
import {router,RouterMount} from './plugins/router.js'  //路径换成自己的
Vue.use(router)
const app = new Vue({
    ...App,
	store
})
app.$mount()
