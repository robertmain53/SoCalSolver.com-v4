
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { slug, locale = 'en', section, content } = body

  if (!slug || !section || !content) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug, section or content' })
  }

  const filePath = join(process.cwd(), 'content', locale, slug + '.md')
  const raw = await readFile(filePath, 'utf-8')

  const pattern = new RegExp(`:::${section}[\\s\\S]*?:::`, 'g')
  const updated = raw.replace(pattern, content)

  await writeFile(filePath, updated, 'utf-8')
  return { success: true }
})
