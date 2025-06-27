
<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div>
    <!-- Existing UI... -->
    <div v-if="result === true" class="text-green-600 mt-2" role="alert">{{ t('quiz.correct') }}</div>
    <div v-else-if="result === false" class="text-red-600 mt-2" role="alert">{{ t('quiz.incorrect') }}</div>
  </div>
</template>



<template>
  <div class="border rounded-xl p-4 mb-4 bg-gray-50 dark:bg-gray-900">
    <div class="font-semibold text-lg mb-2">
      {{ title }} <span v-if="solved" class="text-green-500">✅ Solved</span>
    </div>
    <div class="prose dark:prose-invert mb-4">
      <slot />
    </div>
    <input aria-label="Answer input" role="textbox" 
       tabindex="0" v-model="answer"
      @keydown.enter="checkAnswer"
      class="border rounded px-3 py-1 w-full mb-2"
      :placeholder="solved ? 'Correct!' : 'Type your answer'"
      :disabled="solved"
    />
    <button
      @click="checkAnswer"
      :disabled="solved"
      class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
    >
      Check Answer
    </button>
    <p v-if="feedback" :class="{'text-green-600': isCorrect, 'text-red-600': !isCorrect}" class="mt-2">
      {{ feedback }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useChallengeStore } from '@/stores/challenge'
const props = defineProps<{ title?: string }>()
const store = useChallengeStore()
store.load()
const answer = ref('')
const solved = ref(false)
const feedback = ref('')
const isCorrect = ref(false)

// Temporary static correct answer for demonstration
const correctAnswer = '42'

function normalize(val: string) {
  return val.trim().toLowerCase()
}

function checkAnswer() {
  if (normalize(answer.value) === normalize(correctAnswer)) {
    solved.value = true
    store.increment()
    isCorrect.value = true
    feedback.value = '✅ Correct!'
  } else {
    isCorrect.value = false
    feedback.value = '❌ Try again!'
  }
}
</script>
