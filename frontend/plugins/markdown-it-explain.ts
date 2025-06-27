
import type MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'

export default defineNuxtPlugin(() => {
  const md = useMarkdownIt()

  md.use(container, 'explain', {
    render(tokens, idx) {
      const token = tokens[idx]
      if (token.nesting === 1) {
        return '<ExplainBlock>'
      } else {
        return '</ExplainBlock>'
      }
    }
  })

  // Handle @layman and @technical as sub-containers rendered as <template #layman>
  const modes = ['layman', 'technical']
  for (const mode of modes) {
    md.use(container, mode, {
      render(tokens, idx) {
        const token = tokens[idx]
        if (token.nesting === 1) {
          return `<template #${mode}>`
        } else {
          return '</template>'
        }
      }
    })
  }
})
