import Vue from 'vue'
import Router from 'vue-router'
import MentorAppIndex from '@/components/MentorAppIndex'
import ListMentor from '@/components/list-mentor/ListMentor'
import PortalVue from 'portal-vue'
import { BootstrapVue, AlertPlugin, BAlert } from 'bootstrap-vue'
import UserAuthenticate from '../UserAuthenticate.js'
import BeMentor from '@/components/be-mentor/BeMentor'

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
      component: ListMentor,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/be-mentor',
      name: 'BeMentor',
      component: BeMentor,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (UserAuthenticate.getters.isLoggedIn) {
      next()
      return
    }
    next({ name: 'MentorAppIndex' })
  } else {
    next()
  }
})

export default router
