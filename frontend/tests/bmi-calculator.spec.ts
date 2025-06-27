import { test, expect } from '@playwright/test'

test.describe('Visual regression: BMI Calculator', () => {
  test('should match the visual snapshot', async ({ page }) => {
    await page.goto('http://localhost:3000/en/bmi-calculator')
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveScreenshot('bmi-calculator.png', { fullPage: true })
  })
})