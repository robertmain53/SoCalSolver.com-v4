
<template>
  <div class="text-sm text-gray-600 dark:text-gray-300">
    ✅ {{ count }} quizzes completed by learners
  </div>
</template>

<script setup lang="ts">
const { data: countData } = await useFetch('/api/challenge/count')
const count = computed(() => countData.value?.count || 0)
</script>
