
export default defineEventHandler((event) => {
  const cookie = getCookie(event, 'auth_token')
  if (!cookie) return { user: null }

  try {
    const user = JSON.parse(cookie)
    return { user }
  } catch (e) {
    return { user: null }
  }
})
