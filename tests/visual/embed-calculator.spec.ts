
import { test, expect } from '@playwright/test'

test('Visual regression: embed and main calculator pages', async ({ page }) => {
  const slugs = ['compound-interest', 'bmi', 'mortgage'] // Example slugs

  for (const slug of slugs) {
    await page.goto(`/embed/${slug}`)
    await expect(page).toHaveScreenshot(`embed-${slug}.png`, { fullPage: true })

    await page.goto(`/en/${slug}`)
    await expect(page).toHaveScreenshot(`page-${slug}.png`, { fullPage: true })
  }
})
