import { defineEventHandler, getCookie, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token')

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Not authenticated'
    })
  }

  // Se vuoi fare ulteriori controlli del token (es. JWT), falli qui
  // Esempio (opzionale):
  // const user = verifyJWT(token)
  // event.context.user = user
})
