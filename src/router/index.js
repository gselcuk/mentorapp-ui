import Vue from 'vue'
import Router from 'vue-router'
import MentorAppIndex from '@/components/MentorAppIndex'
import PortalVue from 'portal-vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(Router)
Vue.use(PortalVue)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MentorAppIndex',
      component: MentorAppIndex
    }
  ]
})
