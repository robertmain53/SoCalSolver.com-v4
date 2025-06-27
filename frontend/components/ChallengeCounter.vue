
<template>
  <div class="text-sm text-gray-600 dark:text-gray-300">
    ✅ Global Challenges Solved: <strong>{{ solved }}</strong>
  </div>
</template>

<script setup lang="ts">
import { useChallengeStore } from '@/stores/challenge'

const store = useChallengeStore()
store.load()

const solved = computed(() => store.solved)
</script>
