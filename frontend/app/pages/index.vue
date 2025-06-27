<script setup>
import { useI18n } from 'vue-i18n'

definePageMeta({ layout: 'home' })

// Get the t function for translations
const { t } = useI18n()

// Define categories using their non-translatable keys.
// This is more robust than using the display names.
const categories = [
  { key: 'finance', slug: 'finance' },
  { key: 'mathematics', slug: 'mathematics' },
  { key: 'health-fitness', slug: 'health-fitness' },
  { key: 'science-engineering', slug: 'science-engineering' },
  { key: 'everyday-life', slug: 'everyday-life-utilities' },
  { key: 'business-productivity', slug: 'business-productivity' },
  { key: 'education', slug: 'education' },
  { key: 'environment-sustainability', slug: 'environment-sustainability' },
  { key: 'construction-diy', slug: 'construction-diy' },
  { key: 'fun-miscellaneous', slug: 'fun-miscellaneous' }
]
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 py-12">
   <HomeHero />  
   
  <nav class="grid grid-cols-1 mx-auto justify-items-center gap-6 p-6 md:grid-cols-3 xl:grid-cols-3 xl:w-5xl">
      <NuxtLinkLocale
        v-for="cat in categories"
        :key="cat.key"
        :to="`/${cat.slug}`"
        class="group relative block max-w-sm w-full decoration-none">
  <div class="relative h-[180px] overflow-hidden border rounded-md p-4 transition-all duration-300 group-hover:(scale-102) core-border core-theme" >
    <div class="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div class="relative h-full flex flex-col text-black dark:text-white">
        <div class="flex items-start justify-between">
          <h2 id="page-card-title" class="text-4xl text-inherit font-bold">{{ $t('categoryTitle', { category: $t(`categories.${cat.key}`) }) }}</h2> 
            <Icon  name="lucide:arrow-up-right" class="h6 w6 flex rounded-full p2 text-inherit transition-colors core-ui group-hover:(bg-black text-white) dark:group-hover:(bg-white text-black)" aria-hidden="true" />  
        </div>
                  <p class="flex-grow text-sm dark:text-white">{{ $t('categoryDescription', { category: $t(`categories.${cat.key}`).toLowerCase() }) }}</p>
      </div>
    </div>
  </NuxtLinkLocale>
</nav>
    <homePagesCard />
  </section>
</template>