<template>
  <footer class="w-full border-t b-solid b-gray-200 dark:b-dark-700 bg-white dark:bg-black py-6 mt-8">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 space-y-4 md:space-y-0">
      <!-- Left: Navigation Links -->
      <nav class="flex flex-wrap gap-4 text-sm">
        <NuxtLink to="/" class="hover:underline">{{ t('nav.home') }}</NuxtLink>
        <NuxtLink to="/about" class="hover:underline">{{ t('nav.about') }}</NuxtLink>
        <NuxtLink to="/contact" class="hover:underline">{{ t('nav.contact') }}</NuxtLink>
        <NuxtLink to="/terms" class="hover:underline">{{ t('footer.terms') }}</NuxtLink>
      </nav>
      <!-- Center: Language Switcher -->
      <div>
        <select :value="locale.value" @change="onLocaleChange($event.target.value)" class="px2 py1 rounded text-sm b border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-800 text-black dark:text-white">
          <option v-for="loc in locales" :key="loc.code" :value="loc.code">{{ loc.name }}</option>
        </select>
      </div>
      <!-- Right: Copyright & Socials -->
      <div class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
        <span>© {{ year }} SoCalSolver</span>
        <span class="mx-2">|</span>
        <a href="https://twitter.com/" target="_blank" rel="noopener" aria-label="Twitter" class="hover:underline">Twitter</a>
        <a href="https://linkedin.com/" target="_blank" rel="noopener" aria-label="LinkedIn" class="hover:underline">LinkedIn</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useI18n, useSwitchLocalePath } from '#imports'
const { t, locale, locales, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()
const year = new Date().getFullYear()

function onLocaleChange(newLocale) {
  const path = switchLocalePath(newLocale)
  if (path) router.push(path)
  setLocale(newLocale)
}
</script>
