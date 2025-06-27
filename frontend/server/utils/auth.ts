
import jwt from 'jsonwebtoken'

export async function requireRole(event: any, role: string) {
  const auth = getHeader(event, 'authorization')
  if (!auth || !auth.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  try {
    const token = auth.split(' ')[1]
    const decoded: any = jwt.verify(token, 'socal-secret')
    if (decoded.role !== role) {
      throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
    }
    event.context.user = decoded
  } catch (e) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid token' })
  }
}
