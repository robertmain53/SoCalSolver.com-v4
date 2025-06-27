<template>
  <div class="embed-wrapper">
    <ClientOnly>
      <LazyCalculator :slug="route.params.slug" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { defineAsyncComponent } from 'vue'

const route = useRoute()

const LazyCalculator = defineAsyncComponent(() =>
  import('@/components/calculators/' + route.params.slug + '.vue')
)
</script>

<style scoped>
.embed-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>