 

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">🌐 Translation Manager</h1>
    <select v-model="selectedLocale" class="mb-4 p-2 border rounded">
      <option v-for="locale in locales" :key="locale" :value="locale">{{ locale }}</option>
    </select>
    <input v-model="search" placeholder="Search key..." class="mb-4 p-2 border rounded w-full" />
    <div v-if="translations">
      <div class="mb-4 max-h-96 overflow-y-auto border rounded bg-white dark:bg-zinc-900">
        <div v-for="(value, key) in filteredTranslations" :key="key" class="flex items-center border-b last:border-b-0 p-2">
          <span class="w-1/3 font-mono text-xs text-gray-600">{{ key }}</span>
          <input v-model="editable[key]" class="w-2/3 p-1 border rounded text-xs font-mono" @input="validateJson" />
        </div>
      </div>
      <button @click="save" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded">💾 Save</button>
      <p v-if="statusMsg" class="mt-2 text-sm" :class="{ 'text-green-600': validJson, 'text-red-600': !validJson }">{{ statusMsg }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'

const locales = ['en', 'fr', 'es', 'it', 'ko', 'zh']
const selectedLocale = ref('en')
const translations = ref<Record<string, string> | null>(null)
const editable = ref<Record<string, string>>({})
const statusMsg = ref('')
const validJson = ref(true)
const search = ref('')

const filteredTranslations = computed(() => {
  if (!translations.value) return {}
  if (!search.value) return editable.value
  const s = search.value.toLowerCase()
  return Object.fromEntries(
    Object.entries(editable.value).filter(([k, v]) => k.toLowerCase().includes(s) || v.toLowerCase().includes(s))
  )
})

async function loadTranslations(locale: string) {
  try {
    const res = await fetch(`/i18n/locales/${locale}.json`)
    const data = await res.json()
    translations.value = data
    editable.value = { ...data }
    statusMsg.value = ''
    validJson.value = true
  } catch (e) {
    statusMsg.value = 'Failed to load translations.'
    validJson.value = false
  }
}

function validateJson() {
  try {
    JSON.stringify(editable.value)
    validJson.value = true
    statusMsg.value = 'Valid JSON.'
  } catch (e) {
    validJson.value = false
    statusMsg.value = 'Invalid JSON.'
  }
}

async function save() {
  validateJson()
  if (!validJson.value) {
    statusMsg.value = 'Cannot save: Invalid JSON.'
    return
  }
  // This would POST to an API in a real app
  statusMsg.value = 'Saved (simulation only).'
}

watch(selectedLocale, loadTranslations)
onMounted(() => loadTranslations(selectedLocale.value))

definePageMeta({
  middleware: "checkAuth"
})
</script>
