
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async () => {
  const file = join(process.cwd(), 'server/data/challenges.json')
  const raw = await readFile(file, 'utf-8')
  const data = JSON.parse(raw)
  data.count++
  await writeFile(file, JSON.stringify(data, null, 2))
  return { success: true, count: data.count }
})
