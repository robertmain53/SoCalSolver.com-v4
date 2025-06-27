
import type MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'

export default defineNuxtPlugin((nuxtApp) => {
  const md = useMarkdownIt()

  md.use(container, 'challenge', {
    render(tokens, idx) {
      const token = tokens[idx]
      if (token.nesting === 1) {
        const info = token.info.trim().slice('challenge'.length).trim()
        return `<ChallengeBlock title="\${info}">`
      } else {
        return '</ChallengeBlock>'
      }
    }
  })
})
