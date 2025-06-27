
<template>
  <div v-if="related.length" class="mt-10">
    <h3 class="text-lg font-semibold mb-3">🔗 Related Calculators</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink
        v-for="item in related"
        :key="item.slug"
        :to="`/${locale}/${item.slug}`"
        class="p-4 border rounded shadow hover:shadow-md transition"
      >
        <div class="font-medium">{{ item.title }}</div>
        <div class="text-sm text-gray-500">View calculator →</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ slug: string }>()
const locale = useRoute().params.locale || 'en'
const { data: related } = await useFetch(`/api/related/${props.slug}`)
</script>
