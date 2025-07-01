import { defineEventHandler, getCookie, createError } from 'h3'

export const checkAuth = defineEventHandler((event) => {
  const token = getCookie(event, 'auth_token')
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }
})
