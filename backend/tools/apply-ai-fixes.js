import fs from 'fs'
import path from 'path'

const logsDir = 'logs'
const files = fs.readdirSync(logsDir).filter(f => f.startsWith('ai-review-') && f.endsWith('.json'))

for (const file of files) {
  const fullPath = path.join(logsDir, file)
  const raw = fs.readFileSync(fullPath, 'utf-8')
  const parsed = JSON.parse(raw)

  const originalFile = file.replace('ai-review-', '').replace('.json', '')
  const replacement = parsed.replacement

  if (replacement && replacement.trim().length > 10) {
    fs.writeFileSync(originalFile, replacement)
    console.log(`✅ Applied AI fix to ${originalFile}`)
  } else {
    console.log(`⚠️ No valid replacement in ${file}`)
  }
}