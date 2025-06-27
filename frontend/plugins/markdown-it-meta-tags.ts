
import type MarkdownIt from 'markdown-it'

export default defineNuxtPlugin(() => {
  const md = useMarkdownIt()

  const metaRE = /^@meta\s+(.*)$/i

  md.core.ruler.push('parse_block_meta', (state) => {
    const tokens = state.tokens
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]
      if (token.type === 'paragraph_open' && tokens[i + 1]?.type === 'inline') {
        const inline = tokens[i + 1]
        const match = metaRE.exec(inline.content)
        if (match) {
          const metaString = match[1]
          const meta = Object.fromEntries(
            metaString.split(/\s+/).map(pair => {
              const [k, v] = pair.split('=')
              return [k, v]
            })
          )
          token.meta = { ...token.meta, blockMeta: meta }
          inline.content = '' // remove @meta line from rendered content
        }
      }
    }
  })
})
