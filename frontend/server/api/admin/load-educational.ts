import { readFile } from 'fs/promises'
import path from 'path'

export default defineEventHandler(async (event) => {
  const slug = getQuery(event).slug
  if (!slug) return { error: 'No slug provided' }

  const mdPath = path.resolve('content', 'calculators', `${slug}.generated.en.md`)
  try {
    const raw = await readFile(mdPath, 'utf-8')

    const extractSection = (name) => {
      const match = raw.match(new RegExp(`:::${name}\\n([\s\S]*?):::`, 'm'))
      return match ? match[1].trim() : ''
    }

    return {
      explain: extractSection('explain'),
      learn: extractSection('learn'),
      challenge: extractSection('challenge')
    }
  } catch (e) {
    return { error: 'Could not read file' }
  }
})