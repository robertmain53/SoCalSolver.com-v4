import { readFile, writeFile } from 'fs/promises'
import { execSync } from 'child_process'
import path from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { slug, explain, learn, challenge } = body
  const mdPath = path.resolve('content', 'calculators', `${slug}.generated.en.md`)

  try {
    const raw = await readFile(mdPath, 'utf-8')

    const replaceSection = (name, value) =>
      raw.replace(
        new RegExp(`:::${name}\\n([\s\S]*?):::`, 'm'),
        `:::${name}\n${value}\n:::`
      )

    let updated = raw
    updated = replaceSection('explain', explain)
    updated = replaceSection('learn', learn)
    updated = replaceSection('challenge', challenge)

    await writeFile(mdPath, updated, 'utf-8')

    // Git commit the changes
    execSync('git config user.email "bot@calchub.com"')
    execSync('git config user.name "CalcHub Bot"')
    execSync(`git add "${mdPath}"`)
    execSync(`git commit -m "✍️ Updated educational content for ${slug}"`)

    return { success: true }
  } catch (e) {
    return { error: 'Failed to update file: ' + e.message }
  }
})