import { OpenAI } from 'openai'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { inputs, formula } = body

  if (!inputs || !formula) {
    throw createError({ statusCode: 400, statusMessage: 'Missing inputs or formula' })
  }

  const prompt = `Generate a calculator code in JavaScript. Use these inputs:

${JSON.stringify(inputs, null, 2)}

Formula:
${formula}

Return only the code.`

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const response = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-4'
  })

  return {
    code: response.choices[0].message.content
  }
})
