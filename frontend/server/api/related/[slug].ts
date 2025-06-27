
import { readFile, readdir } from 'fs/promises'
import { join, parse } from 'path'
import matter from 'gray-matter'

export default defineEventHandler(async (event) => {
  const slug = event.context.params?.slug
  const baseDir = join(process.cwd(), 'content', 'en')
  const files = await readdir(baseDir)
  const data = []

  for (const file of files) {
    const full = await readFile(join(baseDir, file), 'utf-8')
    const { data: fm } = matter(full)
    data.push({ slug: parse(file).name, ...fm })
  }

  const current = data.find(d => d.slug === slug)
  if (!current) throw createError({ statusCode: 404, statusMessage: 'Not found' })

  const related = data
    .filter(d => d.slug !== slug)
    .map(d => ({
      slug: d.slug,
      title: d.title,
      score: d.tags?.filter(tag => current.tags?.includes(tag)).length || 0
        + (d.units && current.units && d.units.some(u => current.units.includes(u)) ? 1 : 0)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)

  return related
})
