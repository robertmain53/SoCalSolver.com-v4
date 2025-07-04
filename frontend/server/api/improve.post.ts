
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { slug, lang } = body

  const filePath = join(process.cwd(), 'content', lang, `${slug}.${lang}.md`)
  const raw = readFileSync(filePath, 'utf-8')

  const improvedContent = `
:::explain
@layman
This version of the calculator helps everyday users understand how each parameter affects the outcome.

@technical
The formula derives from standard compound interest models, applying principal, rate, and time to predict growth.
:::

:::learn
People use this when deciding on loans, investments, or retirement planning. It's crucial for long-term financial literacy.
:::

:::challenge
@answer 2x
If your principal doubles, how does the total amount change?
:::
`

  const updated = raw + '\n\n' + improvedContent
  const outputPath = join(process.cwd(), 'content-improved', `${slug}.${lang}.md`)

  writeFileSync(outputPath, updated, 'utf-8')

  return {
    slug,
    lang,
    saved: true,
    path: outputPath
  }
})
