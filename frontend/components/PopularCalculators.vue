<template>
  <div class="my-10">
    <h2 class="text-xl font-semibold mb-4">🔥 Popular Calculators</h2>
    <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <li v-for="(views, slug) in sortedPopular" :key="slug" class="text-sm">
        <NuxtLink
          :to="`/${lang}/${slug.split('/')[1]}`"
          class="text-blue-600 hover:underline"
        >
          {{ slug }}
        </NuxtLink>
        <span class="text-gray-400">({{ views }} views)</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
const { data } = await useFetch('/analytics/mock.json')
const lang = useRoute().params.lang || 'en'

const totals = {}

for (const day in data.value) {
  for (const slug in data.value[day]) {
    totals[slug] = (totals[slug] || 0) + data.value[day][slug]
  }
}

const sortedPopular = Object.fromEntries(
  Object.entries(totals)
    .filter(([slug]) => slug.startsWith(lang))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
)
</script>