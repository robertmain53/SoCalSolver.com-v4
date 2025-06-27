
import { readFileSync } from 'fs'
import { join } from 'path'
import { diffLines } from 'diff'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { slug, lang } = body

  const currentPath = join(process.cwd(), 'content', lang, `${slug}.${lang}.md`)
  const improvedPath = join(process.cwd(), 'content-improved', `${slug}.${lang}.md`)

  const current = readFileSync(currentPath, 'utf-8')
  const improved = readFileSync(improvedPath, 'utf-8')

  const diff = diffLines(current, improved)

  return {
    slug,
    lang,
    diff
  }
})
