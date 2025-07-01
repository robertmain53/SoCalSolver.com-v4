<script setup lang="ts">
definePageMeta({ middleware: 'checkAuth' })
</script>


<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">📝 User Feedback</h1>

    <div v-if="feedback?.length">
      <div v-for="(entry, index) in feedback" :key="index" class="border rounded-lg p-4 mb-3 bg-white dark:bg-gray-800">
        <p class="text-sm text-gray-500">🕒 {{ new Date(entry.time).toLocaleString() }} | {{ entry.lang }}/{{ entry.slug }}</p>
        <p class="mb-1">⭐ <strong>{{ entry.rating }}</strong> / 5</p>
        <p v-if="entry.comment" class="text-gray-700 dark:text-gray-300">💬 {{ entry.comment }}</p>
      </div>
    </div>

    <p v-else class="text-red-500">No feedback available.</p>
  </div>
</template>

<script setup lang="ts">
const { data: feedback } = await useFetch('/logs/feedback.json')
</script>
