
import { defineStore } from 'pinia'

export const useChallengeStore = defineStore('challenge', {
  state: () => ({
    solved: 0
  }),
  actions: {
    increment() {
      this.solved++
      localStorage.setItem('solvedChallenges', String(this.solved))
    },
    load() {
      const stored = localStorage.getItem('solvedChallenges')
      this.solved = stored ? parseInt(stored, 10) : 0
    }
  }
})
