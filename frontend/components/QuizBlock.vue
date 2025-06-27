
<template>
  <div class="my-6 border rounded p-4 bg-yellow-50 dark:bg-yellow-900">
    <h3 class="font-semibold text-lg mb-2">🧠 Quiz</h3>
    <p class="mb-2">{{ question }}</p>
    <input v-model="userAnswer" placeholder="Your answer..." class="border px-2 py-1 rounded w-full mb-2" />
    <button @click="check" class="bg-blue-600 text-white px-3 py-1 rounded">Check</button>
    <p v-if="showResult" class="mt-2 text-sm" :class="isCorrect ? 'text-green-600' : 'text-red-600'">
      {{ isCorrect ? '✅ Correct!' : '❌ Try again.' }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ question: string, answer: string }>()

const userAnswer = ref('')
const showResult = ref(false)
const isCorrect = ref(false)

function check() {
  showResult.value = true
  isCorrect.value = userAnswer.value.trim().toLowerCase() === answer.trim().toLowerCase()
}
</script>
