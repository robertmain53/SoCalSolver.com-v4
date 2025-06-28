import container from "markdown-it-container"
import type MarkdownIt from "markdown-it"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("content:markdown", (md: MarkdownIt) => {
    md.use(container, "challenge", {
      render(tokens, idx) {
        const token = tokens[idx]
        if (token.nesting === 1) {
          // opening
          const content = tokens[idx + 1]?.content || ''
          const match = content.match(/@answer\s+(.*)/)
          const answer = match ? match[1].trim() : ''
          const question = content.replace(/@answer\s+.*/, '').trim().replace(/\n/g, ' ')
          return `<QuizBlock :question="\`${question}\`" :answer="\`${answer}\`">`
        } else {
          // closing
          return '</QuizBlock>'
        }
      }
    })
  })
})
