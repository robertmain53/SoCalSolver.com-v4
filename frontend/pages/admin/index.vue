<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4">🧠 Admin Dashboard</h1>
    <p class="text-gray-600 mb-6">Manage drafts, reviews, approvals, and publishing of calculators.</p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="calc in calculators"
        :key="calc.slug"
        class="border rounded-xl p-4 bg-white dark:bg-zinc-900 shadow"
      >
        <h2 class="font-semibold text-lg">{{ calc.title }}</h2>
        <p class="text-sm text-gray-500 mb-2">{{ calc.slug }}</p>
        <p class="text-xs text-yellow-600 mb-4">{{ calc.status }}</p>

        <div class="flex flex-wrap gap-2">
          <NuxtLink :to="`/admin/calc/${calc.slug}`" class="text-blue-600 hover:underline text-sm">📝 Review</NuxtLink>
          <NuxtLink :to="`/admin/logs/${calc.slug}`" class="text-blue-600 hover:underline text-sm">📜 Logs</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const calculators = await $fetch('/api/admin/list')
</script>