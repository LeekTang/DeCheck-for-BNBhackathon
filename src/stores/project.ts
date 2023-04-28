import { defineStore } from 'pinia'

export const projectStore = defineStore('project',{
  state() {
    return {
      chain: 0,
      projectID: 0
    }
  },
  getters: {
    getChain(state) {
      return state.chain
    },
    getProjectID(state) {
      return state.projectID
    },
  },
  persist: {
    storage: persistedState.localStorage,
  }
})