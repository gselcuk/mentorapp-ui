import Vue from 'vue'
import Router from 'vue-router'
import MentorAppIndex from '@/components/MentorAppIndex'
import ListMentor from '@/components/list-mentor/ListMentor'
import PortalVue from 'portal-vue'
import { BootstrapVue, AlertPlugin, BAlert } from 'bootstrap-vue'
import store from '../store.js'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from 'vee-validate'
import en from 'vee-validate/dist/locale/en.json'
import * as rules from 'vee-validate/dist/rules'

// Install VeeValidate rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

localize('en', en)

// Install VeeValidate components globally
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
Vue.use(AlertPlugin)
Vue.use(Router)
Vue.use(PortalVue)
Vue.use(BootstrapVue)
Vue.component('b-alert', BAlert)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'MentorAppIndex',
      component: MentorAppIndex
    },
    {
      path: '/list-mentor',
      name: 'Listmentor',
      component: ListMentor
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
