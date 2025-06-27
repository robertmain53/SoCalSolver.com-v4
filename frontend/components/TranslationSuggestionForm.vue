
<template>
  <div class="border-t pt-6 mt-10">
    <h3 class="text-lg font-semibold mb-2">💡 Suggest a Translation</h3>
    <form @submit.prevent="submit">
      <label class="block text-sm font-medium mb-1">Section</label>
      <select v-model="field" class="border px-2 py-1 rounded mb-3 w-full">
        <option disabled value="">Select a section</option>
        <option value="title">Title</option>
        <option value="description">Description</option>
        <option value="explain">Explanation</option>
        <option value="learn">Learning Context</option>
        <option value="challenge">Challenge</option>
      </select>

      <label class="block text-sm font-medium mb-1">Your Suggestion</label>
      <textarea v-model="text" rows="4" class="border px-2 py-1 rounded w-full mb-3" required></textarea>

      <label class="block text-sm font-medium mb-1">Your Name (optional)</label>
      <input v-model="name" class="border px-2 py-1 rounded w-full mb-3" />

      <button type="submit" class="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">
        Submit Suggestion
      </button>

      <p v-if="submitted" class="text-green-600 mt-2">✅ Thank you! Your suggestion has been submitted.</p>
    </form>
  </div>
</template>

<script setup lang="ts">
const field = ref('')
const text = ref('')
const name = ref('')
const submitted = ref(false)

async function submit() {
  await $fetch('/api/translation-suggest', {
    method: 'POST',
    body: {
      field: field.value,
      text: text.value,
      name: name.value,
      page: useRoute().fullPath,
      lang: useRoute().params.lang
    }
  })
  submitted.value = true
  field.value = ''
  text.value = ''
  name.value = ''
}
</script>
