export default defineNuxtRouteMiddleware((to) => {
    if (process.server) return
  
    const locale = to.query.lang
    const pathLocale = to.path.split('/')[1]
  
    if (!pathLocale && locale) {
      return navigateTo(`/${locale}${to.fullPath}`, { replace: true })
    }
  })
  