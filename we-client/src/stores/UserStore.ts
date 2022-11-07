import { WeMember } from '@/models/we-member.model'
import router from '@/router';
import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const useUserStore = defineStore('UserStore', {
  state: () => ({
    user: {
      id: null,
      firstName: '',
      lastName: '',
      nickName: '',
      token: JSON.parse(String(localStorage.getItem('token'))),
    },
    loginError: false
  }),
  getters: {
    getUserId: (state) => state.user?.id,
    getUserFirstName: (state) => state.user?.lastName,
    getUserLastName: (state) => state.user?.firstName,
    getUserNickName: (state) => state.user?.nickName,
    isAuthenticated: (state) => !!state.user.token
  },
  actions: {
    logIn(user: WeMember) {
      axios.post(`${BASE_URL}/auth/signin`, {
        email: user.email,
        password: user.password
      }).then(response => {
        const { access_token: token } = response?.data
        this.user.token = token
        localStorage.setItem('token', JSON.stringify(token))
        router.push('/')
        this.loginError = false
      }).catch(e => {
        this.loginError = true
      })
    },
    logOut() {
      localStorage.removeItem('token')
      this.user.token = null
    },
    getUserInfo() {
      const token = JSON.parse(String(localStorage.getItem('token')))
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      axios.get(`${BASE_URL}/users/me`, config)
        .then(response => {
          this.user = { token, ...response.data }
        })
    }
  }
})