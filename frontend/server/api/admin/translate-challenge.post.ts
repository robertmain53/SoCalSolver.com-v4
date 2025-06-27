
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { OpenAI } from 'openai'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { slug, baseLocale = 'en', targetLocales = ['es', 'fr', 'it'] } = body
  const filepath = join(process.cwd(), 'content', baseLocale, slug + '.md')
  const content = await readFile(filepath, 'utf-8')

  const challengeBlock = content.match(/:::challenge[\s\S]*?:::/g)?.[0]
  if (!challengeBlock) throw createError({ statusCode: 404, statusMessage: 'No challenge block found' })

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const results = {}

  for (const locale of targetLocales) {
    const prompt = \`Translate this quiz into \${locale}. Preserve markdown structure and @answer.

\${challengeBlock}\`
    const response = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4'
    })

    const translated = content.replace(challengeBlock, response.choices[0].message.content)
    const targetPath = join(process.cwd(), 'content', locale, slug + '.md')
    await writeFile(targetPath, translated, 'utf-8')
    results[locale] = true
  }

  return { success: true, translated: results }
})
