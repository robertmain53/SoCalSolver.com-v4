<template>
<footer
  :class="['app-footer px6 py8 border-t b-solid b-gray-200 dark:b-dark-700 bg-white dark:bg-black text-gray-600 dark:text-gray-400 text-sm fade-in', { visible: isVisible }]"
>
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      <!-- Column 1: Logo + copyright + socials -->
      <div class="flex flex-col space-y-4">
        <NuxtLink to="/" class="inline-block logo-footer mb-2">
          <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" class="h10 w10">
            <circle cx="300" cy="300" r="280" fill="#6B2C51" />
            <text x="300" y="320" font-family="Montserrat, sans-serif" font-size="48" fill="#fff" text-anchor="middle">S</text>
          </svg>
        </NuxtLink>
        <p>&copy; {{ currentYear }} {{ t('footer.rights') }}</p>
        <!-- Social icons (SVG) -->
        <div class="flex space-x-4 text-xl">
          <a href="https://twitter.com" target="_blank" rel="noopener" class="social-icon" aria-label="Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener" class="social-icon" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
              <path d="M12 0a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61a3.18 3.18 0 00-1.34-1.75c-1.09-.75.08-.74.08-.74a2.53 2.53 0 011.84 1.24 2.55 2.55 0 003.49 1 2.54 2.54 0 01.76-1.6c-2.67-.3-5.47-1.34-5.47-5.96a4.65 4.65 0 011.24-3.22 4.32 4.32 0 01.12-3.18s1-.32 3.3 1.23a11.4 11.4 0 016 0c2.3-1.55 3.3-1.23 3.3-1.23a4.32 4.32 0 01.12 3.18 4.65 4.65 0 011.24 3.22c0 4.63-2.8 5.66-5.48 5.95a2.86 2.86 0 01.82 2.22v3.29c0 .32.22.7.82.58A12 12 0 0012 0z" />
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener" class="social-icon" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
              <path d="M20.45 20.45h-3.554v-5.569c0-1.327-.028-3.036-1.849-3.036-1.85 0-2.134 1.445-2.134 2.939v5.666H9.354V9h3.413v1.561h.048c.476-.9 1.637-1.849 3.368-1.849 3.6 0 4.268 2.368 4.268 5.448v6.285zM5.337 7.433a2.062 2.062 0 112.062-2.062 2.062 2.062 0 01-2.062 2.062zm1.776 13.017H3.56V9h3.553v11.45zM22.225 0H1.771A1.772 1.772 0 000 1.771v20.452A1.772 1.772 0 001.771 24h20.452A1.772 1.772 0 0024 22.223V1.771A1.772 1.772 0 0022.225 0z" />
            </svg>
          </a>
        </div>
      </div>

      <!-- Column 2: Links -->
      <div class="flex flex-col space-y-2">
        <h4 class="text-base font-semibold mb-2">{{ t('footer.links') }}</h4>
        <NuxtLink to="/privacy" class="hover:underline">{{ t('footer.privacy') }}</NuxtLink>
        <NuxtLink to="/terms" class="hover:underline">{{ t('footer.terms') }}</NuxtLink>
        <NuxtLink to="/contact" class="hover:underline">{{ t('footer.contact') }}</NuxtLink>
      </div>

      <!-- Column 3: Resources -->
      <div class="flex flex-col space-y-2">
        <h4 class="text-base font-semibold mb-2">{{ t('footer.resources') }}</h4>
        <NuxtLink to="/faq" class="hover:underline">{{ t('footer.faq') }}</NuxtLink>
        <NuxtLink to="/docs" class="hover:underline">{{ t('footer.docs') }}</NuxtLink>
        <NuxtLink to="/support" class="hover:underline">{{ t('footer.support') }}</NuxtLink>
      </div>

      <!-- Column 4: Company + Language Switcher -->
      <div class="flex flex-col space-y-2">
        <h4 class="text-base font-semibold mb-2">{{ t('footer.company') }}</h4>
        <NuxtLink to="/about" class="hover:underline">{{ t('footer.about') }}</NuxtLink>
        <NuxtLink to="/careers" class="hover:underline">{{ t('footer.careers') }}</NuxtLink>
        <!-- Language switcher -->
        <div class="mt-4">
          <select
            :value="locale.value"
            @change="setLocale($event.target.value)"
            class="px2 py1 rounded text-sm b border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-800 text-black dark:text-white w-full"
          >
            <option v-for="loc in locales" :key="loc.code" :value="loc.code">{{ loc.name }}</option>
          </select>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';

const { t, locale, locales, setLocale } = useI18n();
const currentYear = computed(() => new Date().getFullYear());

const isVisible = ref(false);

function handleScroll() {
  const footer = document.querySelector('.app-footer');
  if (!footer) return;

  const rect = footer.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    isVisible.value = true;
    // optional: remove listener after first visibility
    window.removeEventListener('scroll', handleScroll);
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // in case footer is already visible
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>


<style scoped>
.logo-footer svg {
  width: 40px;
  height: auto;
  transition: transform 0.3s ease;
}

.logo-footer:hover svg {
  transform: scale(1.1);
}

.social-icon svg {
  transition: transform 0.3s ease, color 0.3s ease, fill 0.3s ease;
  color: currentColor;
  fill: currentColor;
}

.social-icon:hover[aria-label="Twitter"] svg {
  transform: scale(1.2);
  color: #1DA1F2;
  fill: #1DA1F2;
}

.social-icon:hover[aria-label="GitHub"] svg {
  transform: scale(1.2);
  color: #333333;
  fill: #333333;
}

.social-icon:hover[aria-label="LinkedIn"] svg {
  transform: scale(1.2);
  color: #0077B5;
  fill: #0077B5;
}


.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

</style>
