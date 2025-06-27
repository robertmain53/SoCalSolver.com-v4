import { test, expect } from '@playwright/test'

const locales = ['en', 'it', 'es', 'fr', 'ko', 'zh']
const slug = 'bmi-calculator'

for (const lang of locales) {
  test.describe(`Multilingual test: ${lang}`, () => {
    test(`/${lang}/${slug} should load and display title`, async ({ page }) => {
      await page.goto(`http://localhost:3000/${lang}/${slug}`)
      await page.waitForSelector('h1')
      const title = await page.textContent('h1')
      expect(title?.length).toBeGreaterThan(3)
    })
  })
}