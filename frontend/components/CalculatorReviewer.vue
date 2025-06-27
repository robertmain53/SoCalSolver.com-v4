<script setup>
const props = defineProps({
  reviewer: String
})
</script>

<template>
  <div v-if="reviewer" class="text-sm text-gray-500 mt-1">
    ✅ Reviewed by
    <NuxtLink :to="`/info/authors/${slugify(reviewer)}`" class="underline text-green-600">
      {{ reviewer }}
    </NuxtLink>
  </div>
</template>

<script>
function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}
</script>