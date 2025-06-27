
import type MarkdownIt from 'markdown-it'

export default function explainPlugin(md: MarkdownIt) {
  md.use(require('markdown-it-container'), 'explain', {
    render(tokens, idx) {
      const token = tokens[idx]
      if (token.nesting === 1) {
        return '<div class="explain-block">'
      } else {
        const slugVar = 'slug' // to be injected at component level
        return `</div><RelatedCalculators :slug="$route.params.slug" />`
      }
    }
  })
}
