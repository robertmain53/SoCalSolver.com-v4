<template>
  <header class="app-header flex items-center justify-between px4 py2 border-b b-solid b-gray-200 dark:b-dark-700 bg-white dark:bg-black relative z-20">
    <!-- Logo -->
    <div class="logo">
   


   <NuxtLink to="/" class="inline-block logo mb-2">
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" class="h10 w-auto">
    <defs>
      <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#6B2C51"/>
        <stop offset="50%" stop-color="#D4482D"/>
        <stop offset="100%" stop-color="#F28C38"/>
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="80" fill="url(#skyGradient)" stroke="none"/>
    <circle cx="100" cy="130" r="25" fill="#FDBA3B" stroke="none"/>
    <path d="M 20 140 Q 60 130 100 140 T 180 140 L 180 180 L 20 180 Z" fill="#217C8D"/>
    <path d="M 20 155 Q 60 145 100 155 T 180 155 L 180 180 L 20 180 Z" fill="#52B9C0" opacity="0.8"/>
    <path d="M 20 150 Q 80 150 120 155 Q 150 158 180 150 L 180 180 L 20 180 Z" fill="#3C1F38" opacity="0.9"/>
  </svg>
</NuxtLink>



    </div>

    <!-- Desktop Navigation -->
    <nav class="hidden md:flex space-x-6">
      <NuxtLink to="/" class="text-inherit hover:underline" active-class="underline">{{ t('nav.home') }}</NuxtLink>
      <NuxtLink to="/about" class="text-inherit hover:underline" active-class="underline">{{ t('nav.about') }}</NuxtLink>
      <NuxtLink to="/contact" class="text-inherit hover:underline" active-class="underline">{{ t('nav.contact') }}</NuxtLink>
    </nav>

    <!-- Right Section: Search, Language Switcher, Dark Toggle, Hamburger -->
    <div class="flex items-center space-x-3">
      <!-- Search Bar (desktop only) -->
      <form @submit.prevent="onSearchSubmit" class="hidden md:flex items-center space-x-1">
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="t('search.placeholder')"
          class="border b-gray-300 dark:b-dark-700 rounded px2 py1 text-sm"
        />
        <button type="submit" class="px2 py1 rounded bg-brand-light text-white dark:bg-brand-dark">{{ t('search.button') }}</button>
      </form>

      <!-- Language Switcher -->
      <select
        :value="locale.value"
        @change="onLocaleChange($event.target.value)"
        class="px2 py1 rounded text-sm b border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-800 text-black dark:text-white"
      >
        <option v-for="loc in locales" :key="loc.code" :value="loc.code">{{ loc.name }}</option>
      </select>

      <!-- Light/Dark Mode Toggle -->
      <button @click="toggleDark" class="text-xl focus:outline-none" aria-label="Toggle dark mode">
        <span v-if="isDark">🌙</span>
        <span v-else>☀️</span>
      </button>

      <!-- Hamburger Icon con animazione -->
      <button
        @click="toggleMenu"
        class="md:hidden text-2xl focus:outline-none transition-transform duration-300"
        :class="{ 'rotate-90': menuOpen }"
        aria-label="Toggle menu"
      >
        &#9776;
      </button>
    </div>

    <!-- Mobile Menu (animato) -->
   <transition name="fade-slide-menu">
  <div
    v-if="menuOpen"
    class="fixed inset-0 bg-white/70 dark:bg-black/50 backdrop-blur-lg flex flex-col justify-start items-start p6 space-y-4 z-30"
  >
    <NuxtLink @click="toggleMenu" to="/" class="text-inherit text-lg font-semibold hover:underline" active-class="underline">{{ t('nav.home') }}</NuxtLink>
    <NuxtLink @click="toggleMenu" to="/about" class="text-inherit text-lg font-semibold hover:underline" active-class="underline">{{ t('nav.about') }}</NuxtLink>
    <NuxtLink @click="toggleMenu" to="/contact" class="text-inherit text-lg font-semibold hover:underline" active-class="underline">{{ t('nav.contact') }}</NuxtLink>

    <!-- Search in mobile menu -->
    <form @submit.prevent="onSearchSubmit" class="flex flex-col space-y-2 mt-4 w-full">
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="t('search.placeholder')"
        class="border b-gray-300 dark:b-dark-700 rounded px3 py2 text-base w-full"
      />
      <button type="submit" class="px3 py2 rounded bg-brand-light text-white dark:bg-brand-dark text-base">{{ t('search.button') }}</button>
    </form>
  </div>
</transition>

  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useColorMode } from '@vueuse/core'; // Nuxt + UnoCSS compatibile

import { useSwitchLocalePath } from '#imports';
const { t, locale, locales, setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const router = useRouter();

const searchQuery = ref('');
const menuOpen = ref(false);

// Dark mode toggle
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');
const toggleDark = () => {
  colorMode.value = isDark.value ? 'light' : 'dark';
};

function onLocaleChange(newLocale) {
  const path = switchLocalePath(newLocale);
  if (path) router.push(path);
  setLocale(newLocale);
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function onSearchSubmit() {
  if (searchQuery.value.trim() !== '') {
    router.push(`/search?query=${encodeURIComponent(searchQuery.value)}`);
    menuOpen.value = false; // chiudi menu su mobile dopo submit
  }
}
</script>

<style scoped>
/* Transizione elegante per il menu mobile */
.fade-slide-menu-enter-active,
.fade-slide-menu-leave-active {
  transition: max-height 0.4s ease, opacity 0.4s ease, padding 0.4s ease;
  overflow: hidden;
}

.fade-slide-menu-enter-from,
.fade-slide-menu-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.fade-slide-menu-enter-to,
.fade-slide-menu-leave-from {
  max-height: 500px;
  opacity: 1;
  padding-top: 1rem;
  padding-bottom: 1rem;
  /* Aggiunto effetto blur background */
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.75); /* light mode */
  /* fallback per dark mode */
}

@media (prefers-color-scheme: dark) {
  .fade-slide-menu-enter-to,
  .fade-slide-menu-leave-from {
    background-color: rgba(0, 0, 0, 0.6); /* dark mode */
  }
}


/* Logo responsive + animato */
.logo svg {
  width: 80px;
  height: auto;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.logo:hover svg {
  transform: scale(1.05);
  filter: brightness(1.1);
}

@media (max-width: 768px) {
  .logo svg {
    width: 60px;
  }
}

/* Animazione hamburger: ruota di 90 gradi */
.rotate-90 {
  transform: rotate(90deg);
}
</style>
