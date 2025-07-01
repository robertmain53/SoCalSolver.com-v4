// frontend/server/utils/checkAuth.ts
import jwt from 'jsonwebtoken'
import type { H3Event } from 'h3'

export async function checkAuth(event: H3Event) {
  const authHeader = getHeader(event, 'authorization')
  const token = authHeader?.replace('Bearer ', '')

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Missing token'
    })
  }

  try {
    const payload = jwt.verify(token, 'socal-secret') as any
    event.context.user = payload
    return payload
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid token'
    })
  }
}