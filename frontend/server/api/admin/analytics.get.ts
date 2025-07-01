import { checkAuth } from '~/server/utils/checkAuth'

export default defineEventHandler(async (event) => {
  await checkAuth(event)

  // Esempio risposta
  return { message: 'Hello Admin' }
})
