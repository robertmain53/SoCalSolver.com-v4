
<template>
  <div class="mt-10 border-t pt-6">
    <h3 class="text-lg font-semibold mb-2">💬 Was this calculator helpful?</h3>
    <div class="flex items-center gap-1 mb-2">
      <button
        v-for="i in 5"
        :key="i"
        @click="rating = i"
        class="text-2xl"
        :class="{ 'text-yellow-400': i <= rating, 'text-gray-400': i > rating }"
      >★</button>
    </div>
    <textarea
      v-model="comment"
      placeholder="Optional: What could we improve?"
      rows="3"
      class="border px-2 py-1 rounded w-full mb-2"
    />
    <button
      @click="submit"
      :disabled="submitted || rating === 0"
      class="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
    >
      Submit Feedback
    </button>
    <p v-if="submitted" class="text-green-600 mt-2">✅ Thank you for your feedback!</p>
  </div>
</template>

<script setup lang="ts">
const rating = ref(0)
const comment = ref('')
const submitted = ref(false)

async function submit() {
  if (!rating.value) return
  await $fetch('/api/feedback', {
    method: 'POST',
    body: {
      rating: rating.value,
      comment: comment.value,
      slug: useRoute().params.slug,
      lang: useRoute().params.lang,
    }
  })
  submitted.value = true
}
</script>
