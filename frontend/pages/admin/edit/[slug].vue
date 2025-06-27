<template>
  <div class="max-w-5xl mx-auto p-6 space-y-8">
    <h1 class="text-2xl font-semibold">📝 Edit Educational Sections</h1>

    <div v-for="section in ['explain', 'learn', 'challenge']" :key="section">
      <label class="block font-medium mb-1 capitalize">{{ section }}</label>
      <textarea v-model="current[section]" rows="6" class="w-full p-2 border rounded mb-2"></textarea>

      <details class="bg-gray-50 border p-2 rounded">
        <summary class="cursor-pointer text-sm text-blue-600">🧾 Show changes</summary>
        <div class="prose mt-2" v-html="diffs[section]"></div>
      </details>
    </div>

    <button
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      @click="saveContent"
    >
      💾 Save & Commit
    </button>
  </div>
</template>

<script setup>
import { DiffMatchPatch } from 'diff-match-patch'
const dmp = new DiffMatchPatch()

const route = useRoute()
const slug = route.params.slug

const { data } = await useFetch(`/api/admin/load-educational?slug=${slug}`)

const original = {
  explain: data.value?.explain || '',
  learn: data.value?.learn || '',
  challenge: data.value?.challenge || ''
}
const current = reactive({ ...original })
const diffs = reactive({ explain: '', learn: '', challenge: '' })

watch(current, () => {
  for (const section of ['explain', 'learn', 'challenge']) {
    const diff = dmp.diff_main(original[section], current[section])
    dmp.diff_cleanupSemantic(diff)
    diffs[section] = dmp.diff_prettyHtml(diff)
  }
}, { deep: true, immediate: true })

const saveContent = async () => {
  const res = await $fetch('/api/admin/save-educational', {
    method: 'POST',
    body: { slug, ...current }
  })
  alert('✅ Content saved.')
}
</script>