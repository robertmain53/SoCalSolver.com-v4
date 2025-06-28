<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-2xl font-semibold mb-4">🧮 Build Your Calculator</h1>
    <Tabs default-value="inputs" class="w-full">
      <TabList>
        <Tab value="inputs">Inputs</Tab>
        <Tab value="formula">Formula</Tab>
        <Tab value="preview">Preview</Tab>
        <Tab value="export">Export</Tab>
      </TabList>

      <TabPanel value="inputs" class="space-y-3 mt-4">
        <div v-for="(field, i) in inputs" :key="i" class="flex gap-2">
          <input v-model="field.name" placeholder="Name" class="input" />
          <input v-model="field.label" placeholder="Label" class="input" />
          <select v-model="field.type" class="input">
            <option value="number">Number</option>
            <option value="text">Text</option>
          </select>
          <button @click="removeField(i)" class="text-red-500">✕</button>
        </div>
        <button @click="addField" class="bg-blue-500 text-white px-3 py-1 rounded">+ Add Field</button>
      </TabPanel>

      <TabPanel value="formula" class="mt-4">
        <textarea v-model="formula" rows="4" class="w-full p-2 border rounded" placeholder="output = ..."></textarea>
      </TabPanel>

      <TabPanel value="preview" class="mt-4">
        <div v-for="field in inputs" :key="field.name" class="mb-2">
          <label class="block font-semibold">{{ field.label }}</label>
          <input v-model="values[field.name]" type="number" class="input" />
        </div>
        <div class="mt-4 font-bold">Result: {{ evaluate() }}</div>
      </TabPanel>

      <TabPanel value="export" class="mt-4">
        <pre class="bg-gray-100 p-2 rounded text-xs">{{ exportBundle }}</pre>
        <button @click="download" class="bg-green-600 text-white px-3 py-1 rounded mt-2">⬇️ Download .calcbundle.json</button>
      </TabPanel>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const inputs = ref([{ name: '', label: '', type: 'number' }])
const values = ref<Record<string, number | string>>({})
const formula = ref('output = a + b')

function addField() {
  inputs.value.push({ name: '', label: '', type: 'number' })
}
function removeField(index: number) {
  inputs.value.splice(index, 1)
}

function evaluate() {
  try {
    const vars = inputs.value
      .map(f => `const ${f.name} = Number(values["${f.name}"] || 0);`)
      .join('\n')
    const expr = formula.value.includes('=')
      ? formula.value.split('=')[1]
      : formula.value
    // Note: no `values` argument needed, variables are declared inside Function
    return Function(`"use strict"; ${vars}\nreturn ${expr}`)()
  } catch {
    return 'Error'
  }
}

const exportBundle = computed(() =>
  JSON.stringify(
    {
      inputs: inputs.value,
      formula: formula.value,
    },
    null,
    2
  )
)

function download() {
  const blob = new Blob([exportBundle.value], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'custom-calculator.calcbundle.json'
  link.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.input {
  @apply border p-1 rounded w-full;
}
</style>
