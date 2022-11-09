import { WeMember } from '@/models/we-member.model'
import router from '@/router';
import { defineStore } from 'pinia'
import userApi from '@/network/user'

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
      userApi.logIn(user).then(response => {
        const { access_token: token } = response?.data
        localStorage.setItem('token', JSON.stringify(token))
        this.user.token = token
        this.getUserInfo()
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
      userApi.getUserInfo()
        .then(response => {
          const token = JSON.parse(String(localStorage.getItem('token')))
          this.user = { token, ...response.data }
        })
    }
  }
})