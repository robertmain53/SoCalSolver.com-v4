
<template>
  <div class="text-sm flex items-center gap-2">
    <label for="unit-select">Units:</label>
    <select id="unit-select" v-model="override" @change="save" class="border px-2 py-1 rounded">
      <option value="">Auto ({{ systemDefault }})</option>
      <option value="metric">Metric (°C, km)</option>
      <option value="imperial">Imperial (°F, mi)</option>
    </select>
  </div>
</template>

<script setup lang="ts">
const override = ref(localStorage.getItem('unitOverride') || '')
const systemLocale = typeof navigator !== 'undefined' ? navigator.language : 'en-US'
const systemRegion = systemLocale.split('-')[1] || 'US'
const systemDefault = ['US', 'LR', 'MM'].includes(systemRegion) ? 'Imperial' : 'Metric'

function save() {
  localStorage.setItem('unitOverride', override.value)
  location.reload()
}
</script>
