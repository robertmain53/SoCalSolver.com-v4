<template>
  <main class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-4">SoCalSolver</h1>
    <p class="mb-6 text-gray-700">
      Welcome to your AI-powered educational calculator platform.
    </p>

    <section>
      <h2 class="text-2xl font-semibold mb-2">Featured Calculators</h2>
      <ul class="grid md:grid-cols-2 gap-4">
        <li
          v-for="item in calculators"
          :key="item._path"
          class="border rounded p-4 hover:shadow"
        >
          <NuxtLink :to="item._path" class="text-lg font-medium">
            {{ item.title }}
          </NuxtLink>
          <p class="text-sm text-gray-500">
            {{ item.description }}
          </p>
        </li>
      </ul>
    </section>

    <section class="mt-8">
      <NuxtLink
        to="/builder"
        class="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        ➕ Create Your Calculator
      </NuxtLink>
    </section>
  </main>
</template>

<script setup lang="ts">
const { data: calculators } = await useAsyncData('calculators', () =>
  queryContent().only(['_path', 'title', 'description']).limit(6).find()
)

useHead({
  title: 'SoCalSolver - Home',
  meta: [
    { name: 'description', content: 'AI-powered multilingual calculators' }
  ]
})
</script>
