// frontend/middleware/locale-redirect.global.ts
export default defineNuxtRouteMiddleware((to) => {
  // Skip per le API routes e admin routes
  if (to.path.startsWith('/api/') || to.path.startsWith('/admin/')) return
  
  if (process.server) return

  const locale = to.query.lang
  const pathLocale = to.path.split('/')[1]

  // Solo se c'è un parametro lang nella query e non c'è già un locale nel path
  if (!pathLocale && locale && locale !== 'undefined') {
    return navigateTo(`/${locale}${to.path}`, { replace: true })
  }
})