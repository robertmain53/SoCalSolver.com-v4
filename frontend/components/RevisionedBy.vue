
<template>
  <div v-if="data?.name" class="mt-6 p-4 border rounded bg-gray-50 dark:bg-gray-900">
    <p class="text-sm text-gray-700 dark:text-gray-300">
      🛠️ <strong>Revisioned by:</strong>
      <a :href="data.url" class="underline text-blue-600" target="_blank" rel="noopener">
        {{ data.name }}
      </a>
      <span v-if="data.role"> — {{ data.role }}</span>
      <span v-if="data.org"> ({{ data.org }})</span>
      <span v-if="data.date"> — <em>{{ new Date(data.date).toLocaleDateString() }}</em></span>
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  data: {
    name: string
    role?: string
    org?: string
    date?: string
    url?: string
  }
}>()
</script>
