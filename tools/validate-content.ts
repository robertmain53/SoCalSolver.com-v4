
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { z } from 'zod'

const schema = z.object({
  title: z.string().min(1),
  tags: z.array(z.string()).min(1),
  category: z.string(),
  slug: z.string(),
  author: z.string().optional(),
  draft: z.boolean().optional()
})

const contentDir = './content'
const files = readdirSync(contentDir).filter(f => f.endsWith('.md'))

let valid = 0
let errors = 0

files.forEach((file) => {
  const raw = readFileSync(join(contentDir, file), 'utf-8')
  const { data } = matter(raw)

  const result = schema.safeParse(data)
  if (result.success) {
    valid++
  } else {
    console.error(`❌ ${file} failed validation:`)
    console.error(result.error.issues)
    errors++
  }
})

console.log(`\n✅ Valid: ${valid}, ❌ Errors: ${errors}`)
process.exit(errors ? 1 : 0)
