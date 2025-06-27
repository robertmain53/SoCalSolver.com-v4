<script setup lang="ts">
const a = ref(0)
const b = ref(0)
</script>

<template>
  <div class="p-6 border rounded shadow bg-white dark:bg-gray-800">
    <h2 class="text-2xl font-bold mb-4">Simple Adder</h2>
    <div class="flex flex-col sm:flex-row gap-4">
      <input v-model.number="a" type="number" placeholder="Enter a"
             class="border px-4 py-2 rounded w-full sm:w-auto" />
      <input v-model.number="b" type="number" placeholder="Enter b"
             class="border px-4 py-2 rounded w-full sm:w-auto" />
    </div>
    <p class="mt-4 text-lg font-semibold">Result: <span class="text-blue-600 dark:text-blue-300">{{ a + b }}</span></p>
  </div>
</template>
