
import { test, expect } from '@playwright/test'

const calculators = ['compound-interest', 'loan-payment']

for (const slug of calculators) {
  test(`Calculator page - ${slug}`, async ({ page }) => {
    await page.goto(`http://localhost:3000/en/${slug}`)
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveScreenshot(`${slug}-page.png`)
  })

  test(`Embed view - ${slug}`, async ({ page }) => {
    await page.goto(`http://localhost:3000/embed/${slug}`)
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveScreenshot(`${slug}-embed.png`)
  })
}
