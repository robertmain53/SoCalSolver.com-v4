
import { readFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async () => {
  const path = join(process.cwd(), 'logs', 'challenge-counts.json')

  let raw = {}
  try {
    raw = JSON.parse(await readFile(path, 'utf-8'))
  } catch (e) {
    console.warn('Challenge count log not found or invalid')
  }

  const entries = Object.entries(raw || {}).map(([slug, count]) => ({
    slug,
    count
  }))

  entries.sort((a, b) => b.count - a.count)

  return {
    top: entries.slice(0, 10),
    total: entries.reduce((sum, e) => sum + e.count, 0)
  }
})
