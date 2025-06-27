
import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons()],
  theme: {
    extend: {
      colors: {
        sunset: {
          gold: '#FDBB2D',
          coral: '#FF5E62',
          violet: '#9C27B0',
          ocean: '#2196F3',
          driftwood: '#795548',
          cloud: '#FAFAFA',
        }
      }
    }
  }
})
