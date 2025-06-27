
<template>
  <div class="mb-6 border-l-4 pl-4">
    <div class="flex items-center justify-between mb-2">
      <h2 class="text-lg font-semibold">Explanation</h2>
      <select v-model="mode" class="border px-2 py-1 rounded text-sm">
        <option value="layman">Layman</option>
        <option value="technical">Technical</option>
      </select>
    </div>
    <div class="text-xs text-gray-500 mb-2" v-if="$slots[mode] && $slots[mode]()[0]?.children">
  <span v-if="$slots[mode]()[0].children[0]?.meta?.blockMeta">
    🕒 Last updated by {{ $slots[mode]()[0].children[0].meta.blockMeta.author }} on {{ new Date($slots[mode]()[0].children[0].meta.blockMeta.timestamp).toLocaleDateString() }}
  </span>
</div>
<div class="prose dark:prose-invert">
      <slot :name="mode" />
    </div>
  </div>
</template>

<script setup lang="ts">
const mode = ref<'layman' | 'technical'>('layman')
</script>
