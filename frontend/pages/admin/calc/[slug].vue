<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">📝 Reviewing: {{ slug }}</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 class="font-semibold mb-2">📄 Original Markdown</h2>
        <textarea
          v-model="originalMd"
          class="w-full h-96 p-2 border rounded text-sm font-mono bg-white dark:bg-zinc-900"
          readonly
        />
      </div>

      <div>
        <h2 class="font-semibold mb-2">✨ Improved Markdown</h2>
        <textarea
          v-model="improvedMd"
          class="w-full h-96 p-2 border rounded text-sm font-mono bg-white dark:bg-zinc-900"
          readonly
        />
      </div>
    </div>

    <div class="flex gap-4 mt-6">
      <button @click="runImprove" class="px-4 py-2 bg-blue-600 text-white rounded">🤖 Improve</button>
      <button @click="runApprove" class="px-4 py-2 bg-green-600 text-white rounded">✅ Approve</button>
      <button @click="runPublish" class="px-4 py-2 bg-purple-600 text-white rounded">🚀 Publish</button>
    </div>

    <p v-if="statusMsg" class="mt-4 text-sm text-gray-500">{{ statusMsg }}</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug

const originalMd = ref('')
const improvedMd = ref('')
const statusMsg = ref('')

onMounted(async () => {
  const origPath = `/content/${slug}.en.md`
  const impPath = `/content-improved/${slug}.en.md`
  try {
    originalMd.value = await $fetch(origPath)
    improvedMd.value = await $fetch(impPath)
  } catch (e) {
    console.warn('Failed to load content:', e)
  }
})

async function runImprove() {
  statusMsg.value = 'Improving...'
  await $fetch('/improve', { method: 'POST', body: { slug, lang: 'en' } })
  statusMsg.value = 'Improved! Reload page to see updates.'
}

async function runApprove() {
  statusMsg.value = 'Approving...'
  await $fetch('/approve', { method: 'POST', body: { slug, lang: 'en' } })
  statusMsg.value = 'Approved!'
}

async function runPublish() {
  statusMsg.value = 'Publishing...'
  await $fetch('/publish', { method: 'POST', body: { slug, lang: 'en' } })
  statusMsg.value = 'Published!'
}
</script>