import { defineStore } from 'pinia'

export const projectStore = defineStore('project',{
  state() {
    return {
      chain: 0,
      chainID: 0,
      projectID: 0,
      tokenAddr: "",
    }
  },
  getters: {
    getChain(state) {
      return state.chain
    },
    getChainID(state) {
      return state.chainID
    },
    getProjectID(state) {
      return state.projectID
    },
    getTokenAddr(state) {
      return state.tokenAddr
    },
  },
  persist: {
    storage: persistedState.localStorage,
  }
})