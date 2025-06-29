// frontend/stores/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    login(email: string, password: string) {
      console.log('login', email, password)
    },
  },
})
