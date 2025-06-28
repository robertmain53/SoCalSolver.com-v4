<template>
  <div class="max-w-5xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-4">{{ categoryTitle }}</h1>
    <p class="mb-6 text-gray-700">{{ categoryDescription }}</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
      <NuxtLink
        v-for="calc in calculators"
        :key="calc.slug"
        :to="`/calculators/${calc.slug}`"
        class="block p-4 border border-gray-200 rounded-lg hover:shadow transition bg-white"
      >
        <h2 class="font-semibold text-lg">{{ calc.title }}</h2>
        <p class="text-sm text-gray-500 mt-1">{{ calc.description }}</p>
      </NuxtLink>
    </div>

    <div v-if="related?.length">
      <h2 class="text-xl font-semibold mb-2">🌟 Suggested Calculators</h2>
      <ul class="list-disc pl-5">
        <li v-for="item in related" :key="item._path">
          <NuxtLink :to="item._path" class="text-blue-600 hover:underline">
            {{ item.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// Example: These props or data must come from somewhere!
const categoryTitle = 'Example Category'
const categoryDescription = 'This category helps you calculate amazing things.'
const calculators = [
  { slug: 'calc1', title: 'Calculator 1', description: 'Desc 1' },
  { slug: 'calc2', title: 'Calculator 2', description: 'Desc 2' }
]
// If you have `related`, define it too.
const related = []

import { useHead } from '#imports'

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": `What is the ${categoryTitle} category used for?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": categoryDescription
      }
    },
    {
      "@type": "Question",
      "name": `How many calculators are in ${categoryTitle}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `This category currently contains ${calculators?.length || 0} calculators.`
      }
    }
  ]
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(schema)
    }
  ]
})
</script>
