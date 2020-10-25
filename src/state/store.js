/* eslint-disable standard/object-curly-even-spacing */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import URL_CONSTANT from '../URL_CONSTANT'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    status: '',
    id: localStorage.getItem('id')
  },
  mutations: {
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, id) {
      state.status = 'success'
      state.id = id
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.id = ''
    }
  },
  actions: {
    login ({ commit }, user) {
      const token = btoa(unescape(encodeURIComponent(user.userName + ':' + user.password)))
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({
          url: URL_CONSTANT.USER_AUTH,
          data: user,
          method: 'POST',
          headers: {
            Authorization: 'Basic ' + token
          }
        })
          .then(resp => {
            const id = resp.data.id
            const userRole = resp.data.userRole
            const userName = resp.data.userName
            const isAdmin = resp.data.isAdmin

            localStorage.setItem('id', id)
            localStorage.setItem('userRole', userRole)
            localStorage.setItem('userName', userName)
            localStorage.setItem('isAdmin', isAdmin)
            localStorage.setItem('authToken', token)
            commit('auth_success', id, userName)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('id')
        localStorage.removeItem('userRole')
        localStorage.removeItem('userName')
        localStorage.removeItem('isAdmin')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  getters: {
    isLoggedIn: state => state.id,
    authStatus: state => state.status
  }
})
