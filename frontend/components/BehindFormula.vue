
<template>
  <details class="mt-4 p-3 border rounded bg-gray-50 dark:bg-gray-900">
    <summary class="font-semibold cursor-pointer">📘 Behind the Formula</summary>
    <div class="prose prose-sm dark:prose-invert mt-2" v-html="rendered" />
  </details>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useMarkdown } from '#imports'

const props = defineProps<{ markdown: string }>()
const rendered = ref('')
const { render } = useMarkdown()

watchEffect(async () => {
  if (props.markdown) {
    rendered.value = await render(props.markdown)
  }
})
</script>
