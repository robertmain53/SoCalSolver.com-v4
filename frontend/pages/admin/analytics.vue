<script setup lang="ts">
definePageMeta({ middleware: 'checkAuth' })
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 space-y-6">
    <h1 class="text-2xl font-semibold mb-4">📊 Analytics Dashboard</h1>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div class="border p-4 rounded-lg bg-white shadow">
        <div class="text-sm text-gray-500">Total Challenges Solved</div>
        <div class="text-2xl font-bold mt-1">{{ total }}</div>
      </div>
    </div>

    <h2 class="text-xl mt-6 mb-2 font-semibold">Top Calculators</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        v-for="item in top"
        :key="item.slug"
        class="border p-4 rounded-lg bg-white shadow"
      >
        <NuxtLink
          :to="`/en/${item.slug}`"
          class="text-blue-600 hover:underline font-medium"
        >
          {{ item.slug }}
        </NuxtLink>
        <div class="text-sm text-gray-500">{{ item.count }} completions</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: analytics } = await useFetch('/api/analytics/summary')
const total = analytics.value?.total || 0
const top = analytics.value?.top || []
</script>
