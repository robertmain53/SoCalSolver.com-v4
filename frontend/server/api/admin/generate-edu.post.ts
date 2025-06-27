
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { OpenAI } from 'openai' // Make sure to configure

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { slug, locale } = body

  if (!slug) throw createError({ statusCode: 400, statusMessage: 'Missing slug' })

  const filepath = join(process.cwd(), 'content', locale || 'en', slug + '.md')
  const md = await readFile(filepath, 'utf-8')

  const explainPrompt = await readFile(join(process.cwd(), 'utils', 'ai', 'prompts', 'edu-explain.txt'), 'utf-8')
  const learnPrompt = await readFile(join(process.cwd(), 'utils', 'ai', 'prompts', 'edu-learn.txt'), 'utf-8')
  const challengePrompt = await readFile(join(process.cwd(), 'utils', 'ai', 'prompts', 'edu-challenge.txt'), 'utf-8')

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const explainDeepPrompt = await readFile(join(process.cwd(), 'utils', 'ai', 'prompts', 'explain-deep.txt'), 'utf-8');

  const [explain, learn, challenge, deep] = await Promise.all([
    openai.chat.completions.create({ messages: [{ role: 'user', content: explainPrompt + md }], model: 'gpt-4' }),,
    openai.chat.completions.create({ messages: [{ role: 'user', content: learnPrompt + md }], model: 'gpt-4' }),,
    openai.chat.completions.create({ messages: [{ role: 'user', content: challengePrompt + md }], model: 'gpt-4' }),
  ])

  return {
    deepExplain: deep.choices[0].message.content,
    explain: explain.choices[0].message.content,
    learn: learn.choices[0].message.content,
    challenge: challenge.choices[0].message.content
  }
})
