import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const darkMode = ref(false)
  const toggleDarkMode = () => darkMode.value = !darkMode.value
  return { darkMode, toggleDarkMode }
})
