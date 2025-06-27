import fs from 'fs';
import path from 'path';

const bundlePath = process.argv[2];
if (!bundlePath) {
  console.error('Usage: node generate-calculator.js path/to/bundle.json');
  process.exit(1);
}

const bundle = JSON.parse(fs.readFileSync(bundlePath, 'utf-8'));
const { slug, title, description, inputs, formula, output } = bundle;

const vueComponent = `
<template>
  <div class="calculator">
    <h1>${title}</h1>
    <form @submit.prevent="calculate">
      ${inputs.map(input => `
      <label>${input.label}
        <input v-model="form.${input.name}" type="number" required />
      </label>
      `).join('')}
      <button type="submit">Calculate</button>
    </form>
    <div v-if="result !== null">
      <p>${output.label}: {{ result }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  ${inputs.map(i => `${i.name}: ''`).join(',
  ')}
})
const result = ref(null)

function calculate() {
  const { ${inputs.map(i => i.name).join(', ')} } = form.value
  result.value = ${formula}
}
</script>
`.trim();

const markdown = `---
title: "${title}"
description: "${description}"
tags: ${JSON.stringify(bundle.tags || [])}
slug: "${slug}"
---

## What is ${title}?

${description}

## How to use

Fill out the form above to calculate your ${output.label}.
`;

const testScript = `
import { test, expect } from '@playwright/test'

test('${title} calculator', async ({ page }) => {
  await page.goto('/calculators/${slug}')
  ${inputs.map((i, idx) => `await page.locator('input').nth(${idx}).fill('10')`).join('\n  ')}
  await page.locator('button:has-text("Calculate")').click()
  await expect(page.locator('text=${output.label}')).toBeVisible()
})
`.trim();

// Output files
const slugFolder = path.basename(bundlePath).replace('.json', '')
const compPath = path.join('components', 'calculators', `${slug}.vue`)
const mdPath = path.join('content', 'calculators', `${slug}.en.md`)
const testPath = path.join('tests', `${slug}.test.js`)

fs.mkdirSync(path.dirname(compPath), { recursive: true })
fs.mkdirSync(path.dirname(mdPath), { recursive: true })
fs.mkdirSync(path.dirname(testPath), { recursive: true })

fs.writeFileSync(compPath, vueComponent)
fs.writeFileSync(mdPath, markdown)
fs.writeFileSync(testPath, testScript)

console.log('✅ Generated files for', slug)