// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import store from './UserAuthenticate'
import AppNavbar from './components/navbar/Navbar'
import ListMentorUser from './components/list-mentor/ListMentorUser'

Vue.prototype.$http = Axios

Vue.config.productionTip = false
Vue.component('v-navbar', AppNavbar)
Vue.component('v-list-mentor-user', ListMentorUser)

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
