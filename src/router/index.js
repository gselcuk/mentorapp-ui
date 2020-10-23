import Vue from 'vue'
import Router from 'vue-router'
import MentorAppIndex from '@/components/MentorAppIndex'
import ListMentor from '@/components/list-mentor/ListMentor'
import ListMentorMentor from '@/components/list-mentor/ListMentorMentor'
import PortalVue from 'portal-vue'
import { BootstrapVue, AlertPlugin, BAlert } from 'bootstrap-vue'
import store from '../state/store.js'
import BeMentor from '@/components/be-mentor/BeMentor'
import FinalizeBeMentor from '@/components/be-mentor/FinalizeBeMentor'
import RelationDetail from '@/components/relation-detail/RelationDetail'
import Profile from '@/components/profile/Profile'

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
      name: 'ListMentor',
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
    },
    {
      path: '/finalize-be-mentor',
      name: 'FinalizeBeMentor',
      component: FinalizeBeMentor,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/list-mentor-mentor',
      name: 'ListMentorMentor',
      component: ListMentorMentor,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/relation-detail',
      name: 'RelationDetail',
      component: RelationDetail,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next({ name: 'MentorAppIndex' })
  } else {
    next()
  }
})

export default router
