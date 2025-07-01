export default defineEventHandler((event) => {
    const cookie = getCookie(event, 'auth_token')
    if (!cookie) {
      throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
    }
  
    try {
      const user = JSON.parse(cookie)
      event.context.user = user
    } catch {
      throw createError({ statusCode: 401, statusMessage: 'Invalid session' })
    }
  })
  