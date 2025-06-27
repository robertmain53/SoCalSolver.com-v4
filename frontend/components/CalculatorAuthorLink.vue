<script setup>
const props = defineProps({
  author: String
})
</script>

<template>
  <div v-if="author" class="text-sm text-gray-600 mt-6">
    ✍️ Authored by
    <NuxtLink :to="`/info/authors/${slugify(author)}`" class="underline text-blue-600">
      {{ author }}
    </NuxtLink>
  </div>
</template>

<script>
function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}
</script>