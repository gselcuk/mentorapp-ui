// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import store from './state/store'
import AppNavbar from './components/navbar/Navbar'
import ListMentorUser from './components/list-mentor/ListMentorUser'
import ListMentorMentor from './components/list-mentor/ListMentorMentor'
import ChooseExpertise from './components/expertise/ChooseExpertise'
import ListRelation from './components/list-relation/ListRelation'

Vue.prototype.$http = Axios

Vue.config.productionTip = false
Vue.component('v-navbar', AppNavbar)
Vue.component('v-list-mentor-user', ListMentorUser)
Vue.component('v-list-mentor-mentor', ListMentorMentor)
Vue.component('v-choose-expertise', ChooseExpertise)
Vue.component('v-list-relation', ListRelation)

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
