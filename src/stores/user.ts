import { defineStore } from 'pinia'

export const userStore = defineStore('user',{
  state() {
    return {
      userInfo: {},
      isSign: false
    }
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo
    },
    getIsSign(state) {
      return state.isSign
    }
  }
})