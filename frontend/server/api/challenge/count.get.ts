
import { readFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async () => {
  const file = join(process.cwd(), 'server/data/challenges.json')
  const raw = await readFile(file, 'utf-8')
  return JSON.parse(raw)
})
