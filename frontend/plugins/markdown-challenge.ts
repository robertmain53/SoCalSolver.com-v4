
import type MarkdownIt from 'markdown-it'

export default function challengePlugin(md: MarkdownIt) {
  md.use(require('markdown-it-container'), 'challenge', {
    render(tokens, idx) {
      const token = tokens[idx]
      if (token.nesting === 1) {
        // opening tag
        const content = tokens[idx + 1]?.content || ''
        const match = content.match(/@answer\s+(.*)/)
        const answer = match ? match[1].trim() : ''
        const question = content.replace(/@answer\s+.*/, '').trim().replace(/\n/g, ' ')
        return `<QuizBlock :question="\`${question}\`" :answer="\`${answer}\`">`
      } else {
        // closing tag
        return '</QuizBlock>'
      }
    }
  })
}
