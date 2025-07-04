import container from "markdown-it-container"
import type MarkdownIt from "markdown-it"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("content:markdown", (md: MarkdownIt) => {
    md.use(container, "explain", {
      render(tokens, idx) {
        const token = tokens[idx]
        if (token.nesting === 1) {
          // opening tag
          return `<div class="explain-block">`
        } else {
          // closing tag
          return `</div>`
        }
      }
    })
  })
})
