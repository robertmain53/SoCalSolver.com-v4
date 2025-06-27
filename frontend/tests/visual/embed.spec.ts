
import { test, expect } from '@playwright/test'

test('embed page snapshot', async ({ page }) => {
  await page.goto('/embed/sample-calculator')
  await expect(page).toHaveScreenshot('embed-sample.png')
})
