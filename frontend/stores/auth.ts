import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isLoggedIn = computed(() => !!user.value)

  function login(name) {
    user.value = { name }
  }

  function logout() {
    user.value = null
  }

  return { user, isLoggedIn, login, logout }
})
