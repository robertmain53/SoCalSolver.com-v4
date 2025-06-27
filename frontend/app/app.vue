<template>
  <ColorScheme>
    <div class="flex flex-col min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <!-- Header -->
      <AppHeader />

      <!-- Main content -->
      <main class="flex-1 px4 py6 md:px8 md:py10">
        <NuxtPage />
      </main>

      <!-- Footer -->
      <AppFooter />
    </div>
  </ColorScheme>
</template>

<script setup>
import AppHeader from '~/components/AppHeader.vue';
import AppFooter from '~/components/AppFooter.vue';

onServerPrefetch(async () => {
  if (process.server) {
    try {
      await $fetch('/api/__i18n-warmup__')
    } catch (e) {
      console.warn('i18n warmup failed:', e)
    }
  }
})

</script>
