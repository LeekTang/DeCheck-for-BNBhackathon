import { defineStore } from 'pinia'

export const userStore = defineStore('user',{
  state() {
    return {
      userInfo: {},
      searchInfo: {},
      searchProjectInfo: {},
      isSign: false,
      chain: 1,
      tokenID: "",
      tokenAddr: "",
    }
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo
    },
    getIsSign(state) {
      return state.isSign
    },
    getSearchInfo(state) {
      return state.searchInfo
    },
    getSearchProjectInfo(state) {
      return state.searchProjectInfo
    },
    getChain(state) {
      return state.chain
    },
  },
  persist: {
    storage: persistedState.localStorage,
  }
})