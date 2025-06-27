
import { readFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(() => {
  const path = join(process.cwd(), 'server/analytics/analytics.json')
  const raw = readFileSync(path, 'utf-8')
  return JSON.parse(raw)
})
