
import { writeFileSync, existsSync, readFileSync, mkdirSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const logDir = join(process.cwd(), 'logs')
  const logPath = join(logDir, 'usage-log.json')

  if (!existsSync(logDir)) mkdirSync(logDir)

  let existing = []
  if (existsSync(logPath)) {
    try {
      existing = JSON.parse(readFileSync(logPath, 'utf8'))
    } catch {}
  }

  const entry = {
    time: new Date().toISOString(),
    slug: body.slug,
    lang: body.lang,
    ip: getRequestIP(event)
  }

  existing.push(entry)
  writeFileSync(logPath, JSON.stringify(existing, null, 2))

  return { success: true }
})
