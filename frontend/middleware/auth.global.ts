import { isTokenExpired } from '~/utils/isTokenExpired'

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const token = localStorage.getItem('auth_token')
    if (to.path.startsWith('/admin') && to.path !== '/admin/login') {
      if (!token || isTokenExpired(token)) {
        localStorage.removeItem('auth_token')
        return navigateTo('/admin/login')
      }
    }
  }
})