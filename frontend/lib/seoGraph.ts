import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.resolve(process.cwd(), 'content')

export function buildCalculatorGraph() {
  const graph = {}
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'))

  for (const file of files) {
    const filePath = path.join(contentDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(content)

    const slug = file.replace(/\.md$/, '')
    graph[slug] = {
      slug,
      title: data.title || '',
      category: data.category || '',
      tags: data.tags || [],
      language: data.language || 'en',
    }
  }

  return graph
}

export function getRelatedCalculators(slug, graph) {
  const target = graph[slug]
  if (!target) return []

  const related = Object.values(graph).filter(calc => {
    return (
      calc.slug !== slug &&
      (calc.category === target.category ||
       calc.tags.some(tag => target.tags.includes(tag)))
    )
  })

  return related.slice(0, 4) // limit to 4 suggestions
}