
<template>
  <div class="mt-8 border-t pt-6">
    <h2 class="text-xl font-semibold mb-2">🔍 How the Formula Works</h2>

    <div class="prose dark:prose-invert mb-4">
      <p>This result was computed using:</p>
      <pre class="bg-gray-100 dark:bg-gray-900 p-3 rounded">{{ formula }}</pre>

      <p>Here's how the inputs contributed:</p>
      <ul>
        <li v-for="(value, key) in inputs" :key="key">
          <strong>{{ key }}:</strong> {{ value }}
        </li>
      </ul>
    </div>

    <div class="mt-4">
      <h3 class="font-medium mb-2">🎯 Quick Challenge</h3>

      <div class="mb-3">
        <label class="block text-sm mb-1">If "{{ sampleKey }}" doubled, what happens to the result?</label>
        <input v-model="answer1" class="border px-2 py-1 rounded w-full" />
        <p v-if="show1" class="text-sm mt-1" :class="isCorrect1 ? 'text-green-600' : 'text-red-600'">
          {{ isCorrect1 ? '✅ Correct!' : '❌ Try again!' }}
        </p>
      </div>

      <button @click="check1" class="bg-blue-600 text-white px-3 py-1 rounded">Check Answer</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  inputs: Record<string, any>,
  formula: string,
  result: number
}>()

const sampleKey = Object.keys(props.inputs)[0] || 'input'

const answer1 = ref('')
const show1 = ref(false)
const isCorrect1 = ref(false)

function check1() {
  show1.value = true
  const expected = 'doubles'
  isCorrect1.value = answer1.value.trim().toLowerCase().includes(expected)
}
</script>
