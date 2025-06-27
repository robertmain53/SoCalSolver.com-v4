
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

// Directory of markdown files
const contentDir = path.join(__dirname, '..', 'content', 'en')

function getMeta(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data } = matter(raw)
  return { ...data, __path: filePath }
}

function computeSimilarity(a, b) {
  const aTags = new Set(a.tags || [])
  const bTags = new Set(b.tags || [])
  const shared = [...aTags].filter(tag => bTags.has(tag))
  return shared.length
}

function generateRelated() {
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'))
  const all = files.map(f => getMeta(path.join(contentDir, f)))

  all.forEach(entry => {
    const others = all.filter(e => e.__path !== entry.__path)
    const ranked = others
      .map(o => ({ ...o, _score: computeSimilarity(entry, o) }))
      .filter(o => o._score > 0)
      .sort((a, b) => b._score - a._score)
      .slice(0, 3)
      .map(o => ({
        slug: path.basename(o.__path),
        title: o.title || '',
        description: o.description || '',
        language: 'en'
      }))

    const fileContent = fs.readFileSync(entry.__path, 'utf-8')
    const parsed = matter(fileContent)

    parsed.data.related = ranked

    const newContent = matter.stringify(parsed.content, parsed.data)
    fs.writeFileSync(entry.__path, newContent, 'utf-8')
    console.log('Updated related:', path.basename(entry.__path))
  })
}

generateRelated()
