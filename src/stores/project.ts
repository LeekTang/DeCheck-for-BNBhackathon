import { defineStore } from 'pinia'

export const projectStore = defineStore('project',{
  state() {
    return {
      chain: 0,
    }
  },
  getters: {
    getChain(state) {
      return state.chain
    },
  },
  persist: {
    storage: persistedState.localStorage,
  }
})