// frontend/stores/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async login({ email, password }) {
      // call your login API here
      console.log('Logging in with', email, password)
    },
  },
})
