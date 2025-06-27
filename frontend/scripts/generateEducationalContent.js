// scripts/generateEducationalContent.js
import fs from 'fs'
import path from 'path'
import { Configuration, OpenAIApi } from 'openai'

const calcSlug = process.argv[2]
if (!calcSlug) {
  console.error('Please provide a calculator slug, e.g. `compound-interest`')
  process.exit(1)
}

const configPath = path.resolve('content/calcbundle', calcSlug, 'contentConfig.json')
const mdPath = path.resolve('content/calculators', calcSlug + '.en.md')
const outPath = path.resolve('content/calculators', calcSlug + '.generated.en.md')

if (!fs.existsSync(configPath)) {
  console.error('Missing contentConfig.json for:', calcSlug)
  process.exit(1)
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}))

async function generateSection(name, prompt) {
  const res = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: config.styleGuide },
      { role: 'user', content: prompt }
    ]
  })
  return res.data.choices[0].message.content.trim()
}

async function generateAll() {
  const explain = await generateSection('Explain', config.explainPrompt)
  const learn = await generateSection('Learn', config.learnPrompt)
  const challenge = await generateSection('Challenge', config.challengePrompt)

  const content = `---
title: ${calcSlug.replace(/-/g, ' ')} Calculator
description: Auto-generated content.
category: auto
tags: []
---

<Calculator${calcSlug.replace(/(?:^|-)([a-z])/g, (_, c) => c.toUpperCase())} />

## 🧾 How It Works
:::explain
${explain}
:::

## 🧠 Learn the Concept
:::learn
${learn}
:::

## 🎓 Try a Challenge
:::challenge
${challenge}
:::
`

  fs.writeFileSync(outPath, content)
  console.log('✅ Educational content generated:', outPath)
}

generateAll()