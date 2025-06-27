import fs from 'fs-extra'
import path from 'path'

const contentDir = path.resolve('content')
const improvedDir = path.resolve('content-improved')
const approvedDir = path.resolve('approved/content')

export default defineEventHandler(async () => {
  const files = await fs.readdir(contentDir)
  const calculators = []

  for (const file of files) {
    if (!file.endsWith('.md')) continue
    const slug = file.replace(/\.en\.md$/, '')
    const entry: any = { slug, title: slug, status: 'draft' }

    const improvedPath = path.join(improvedDir, file)
    const approvedPath = path.join(approvedDir, file)

    if (await fs.pathExists(improvedPath)) entry.status = 'improved'
    if (await fs.pathExists(approvedPath)) entry.status = 'approved'

    calculators.push(entry)
  }

  return calculators
})