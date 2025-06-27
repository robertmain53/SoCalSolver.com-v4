import fs from 'fs'
import path from 'path'

export function logAIError(slug: string, error: any, prompt?: string) {
  const filepath = path.resolve('logs/ai-error.json')
  const entry = {
    slug,
    error: error.message || error.toString(),
    prompt,
    time: new Date().toISOString()
  }
  const prev = fs.existsSync(filepath)
    ? JSON.parse(fs.readFileSync(filepath, 'utf8'))
    : []
  prev.push(entry)
  fs.writeFileSync(filepath, JSON.stringify(prev, null, 2))
}
