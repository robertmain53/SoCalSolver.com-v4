
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, kebabCase } from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  const base = join(process.cwd(), 'generated', slug)

  if (!existsSync(base)) mkdirSync(base, { recursive: true })

  const md = `---
title: "${body.title}"
slug: "${slug}"
tags: [${body.tags.split(',').map(t => `"${t.trim()}"`).join(', ')}]
---

:::meta
Generated from builder UI
:::

:::inputs
${body.inputs.map(i => `- name: ${i.name}
  label: "${i.label}"
  unit: "${i.unit}"`).join('
')}
:::

:::formula
${body.formula}
:::
`

  const vue = `<template>
  <div>
    <h1>${body.title}</h1>
    <!-- Form UI goes here -->
  </div>
</template>

<script setup>
defineProps(['inputs'])
</script>
`

  const test = `test('Calculator ${slug} works', () => {
  // TODO: implement test logic
})`

  writeFileSync(join(base, `${slug}.en.md`), md, 'utf-8')
  writeFileSync(join(base, `${slug}.vue`), vue, 'utf-8')
  writeFileSync(join(base, `${slug}.test.js`), test, 'utf-8')

  return { success: true, slug }
})
