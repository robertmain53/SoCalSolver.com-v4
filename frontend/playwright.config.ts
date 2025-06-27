
import { defineConfig } from '@playwright/test'

export default defineConfig({
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    screenshot: 'only-on-failure',
  },
  testDir: './tests/visual',
  timeout: 10000,
})
