import { requireAuth } from '../../utils/requireAuth'

export default defineEventHandler((event) => {
  requireAuth(event)
  return { id: 1, name: 'John Doe', email: 'john@example.com' }
})
