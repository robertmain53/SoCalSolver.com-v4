<template>
  <div class="my-10">
    <h2 class="text-xl font-semibold mb-4">📈 Weekly Top Calculators</h2>
    <div v-if="report">
      <ul class="space-y-2">
        <li
          v-for="item in report.topCalculators"
          :key="item.slug"
          class="flex justify-between border-b pb-1"
        >
          <span class="text-blue-600 font-medium">{{ item.slug }}</span>
          <span class="text-gray-500">{{ item.views }} views</span>
        </li>
      </ul>
      <p class="text-xs text-gray-400 mt-2">Last updated: {{ new Date(report.generatedAt).toLocaleString() }}</p>
    </div>
    <div v-else>
      <p class="text-sm text-gray-500">Loading weekly report...</p>
    </div>
  </div>
</template>

<script setup>
const { data: report } = await useFetch('/analytics/weekly-report.json')
</script>