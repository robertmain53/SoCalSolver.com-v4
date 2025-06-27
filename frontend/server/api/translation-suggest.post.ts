
import { writeFileSync, existsSync, readFileSync, mkdirSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const logDir = join(process.cwd(), 'logs')
  const logPath = join(logDir, 'translation-suggestions.json')

  if (!existsSync(logDir)) mkdirSync(logDir)

  let existing = []
  if (existsSync(logPath)) {
    try {
      existing = JSON.parse(readFileSync(logPath, 'utf8'))
    } catch {}
  }

  const entry = {
    time: new Date().toISOString(),
    field: body.field,
    text: body.text,
    name: body.name || 'anonymous',
    page: body.page,
    lang: body.lang
  }

  existing.push(entry)
  writeFileSync(logPath, JSON.stringify(existing, null, 2))

  return { success: true }
})
