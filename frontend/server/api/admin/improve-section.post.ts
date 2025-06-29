import { OpenAI } from 'openai'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { content, section, style = 'technical' } = body

  if (!content) {
    throw createError({ statusCode: 400, statusMessage: 'Missing content' })
  }

  const prompt = `Improve this ${section} block to be clearer and more intuitive for learners. Keep markdown formatting. Don't invent new data.

${content}`

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const response = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-4'
  })

  const log = {
    timestamp: new Date().toISOString(),
    section,
    original: content,
    improved: response.choices[0].message.content,
    model: 'gpt-4'
  }

  const fs = require('fs')
  const logPath = './logs/ai-history.json'
  const existing = fs.existsSync(logPath) ? JSON.parse(fs.readFileSync(logPath, 'utf-8')) : []
  existing.push(log)
  fs.writeFileSync(logPath, JSON.stringify(existing, null, 2))

  return { improved: response.choices[0].message.content }
})
