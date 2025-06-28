import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  const darkMode = ref(false)
  const toggleDarkMode = () => darkMode.value = !darkMode.value
  return { darkMode, toggleDarkMode }
})
