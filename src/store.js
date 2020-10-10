/* eslint-disable standard/object-curly-even-spacing */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
  		status: '',
  		id: localStorage.getItem('id') || '',
  		user: {}
  },
  mutations: {
    auth_request (state) {
	    	state.status = 'loading'
	  	},
	  	auth_success (state, id, user) {
		    state.status = 'success'
		    state.id = id
		    state.user = user
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
	  	login ({commit}, user) {
	        return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: 'http://localhost:8080/user/authenticate/',
          data: user,
          method: 'POST',
          headers: { Authorization: 'Basic ' + btoa(unescape(encodeURIComponent(user.userName + ':' + user.password)))
          }})
	            .then(resp => {
	                const id = resp.data.id
            const userName = resp.data.userName
            const userRole = resp.data.userRole

            localStorage.setItem('id', id)
            localStorage.setItem('userRole', userRole)

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
	  	logout ({commit}) {
		    return new Promise((resolve, reject) => {
		      	commit('logout')
		      	localStorage.removeItem('token')
		      	delete axios.defaults.headers.common['Authorization']
		      	resolve()
		    })
	  	}
  },
  getters: {
	  isLoggedIn: state => !!state.token,
	  authStatus: state => state.status
  }
})
