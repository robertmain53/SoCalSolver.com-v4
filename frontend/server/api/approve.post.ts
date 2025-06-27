
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

import checkAuth from '~/server/middleware/checkAuth'

export default defineEventHandler(async (event) => {
  await checkAuth(event)
  if (event.context.user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  const body = await readBody(event)
  const { slug, lang } = body

  const improvedPath = join(process.cwd(), 'content-improved', `${slug}.${lang}.md`)
  const originalPath = join(process.cwd(), 'content', lang, `${slug}.${lang}.md`)

  const improved = readFileSync(improvedPath, 'utf-8')
  writeFileSync(originalPath, improved, 'utf-8')

  return { approved: true, slug, lang }
})
