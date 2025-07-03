import type MarkdownIt from "markdown-it"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("content:markdown", (md: MarkdownIt) => {
    // Example: a simple plugin to process custom meta tags
    md.core.ruler.push("extract_meta", (state) => {
      state.tokens.forEach((token) => {
        if (token.type === "inline" && token.content.startsWith("@meta")) {
          // You can implement whatever logic you need here
          console.log("Found meta:", token.content)
        }
      })
    })
  })
})
