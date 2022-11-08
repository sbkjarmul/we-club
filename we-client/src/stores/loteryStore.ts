import { defineStore } from "pinia"
import { ref } from "vue"
import loteryApi from '@/network/lotery'

export const useLoteryStore = defineStore('LoteryStore', () => {
  const drawnUser = ref({
    email: '',
    firstName: '',
    lastName: '',
    nickName: ''
  })

  const draw = () => {
    loteryApi.draw()
      .then(() => {
        getDrawnUser()
      })
  }

  const getDrawnUser = () => {
    loteryApi.getDrawnUser()
      .then(response => {
        drawnUser.value = response.data
      })
  }

  return {
    draw,
    getDrawnUser,
    drawnUser
  }
})