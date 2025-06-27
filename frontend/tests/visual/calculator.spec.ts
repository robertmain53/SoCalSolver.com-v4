
import { test, expect } from '@playwright/test'

test('calculator page snapshot', async ({ page }) => {
  await page.goto('/en/sample-calculator')
  await expect(page).toHaveScreenshot('calculator-sample.png')
})
