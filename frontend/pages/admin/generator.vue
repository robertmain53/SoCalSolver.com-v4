<script setup lang="ts">
definePageMeta({ middleware: 'checkAuth' })
</script>


<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">🧠 AI Educational Content Generator</h1>

    <form @submit.prevent="generateEdu" class="space-y-4">
      <div>
        <label class="block font-medium mb-1">Slug</label>
        <input v-model="slug" class="border px-3 py-1 rounded w-full" placeholder="e.g. compound-interest" required />
      </div>

      <div>
        <label class="block font-medium mb-1">Language</label>
        <select v-model="lang" class="border px-2 py-1 rounded w-full">
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="it">Italiano</option>
          <option value="fr">Français</option>
        </select>
      </div>

      <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" :disabled="loading">
        {{ loading ? 'Generating...' : 'Generate Content' }}
      </button>
    </form>

    <p v-if="success" class="text-green-600 mt-4">✅ Content injected successfully into {{ slug }}.{{ lang }}.md</p>
    <p v-if="error" class="text-red-600 mt-4">❌ Failed to generate: {{ error }}</p>
  </div>
</template>

<script setup lang="ts">
const slug = ref('')
const lang = ref('en')
const loading = ref(false)
const success = ref(false)
const error = ref('')

async function generateEdu() {
  loading.value = true
  success.value = false
  error.value = ''
  try {
    const res = await $fetch('/api/admin/generate-edu', {
      method: 'POST',
      body: { slug: slug.value, lang: lang.value }
    })
    success.value = res.success
  } catch (err) {
    error.value = (err as Error).message || 'Unknown error'
  } finally {
    loading.value = false
  }
}
</script>
