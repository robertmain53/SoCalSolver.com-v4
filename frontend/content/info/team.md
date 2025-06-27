---
title: Meet the Team
description: Our expert contributors and reviewers behind CalcHub calculators.
---

# 👥 Meet the CalcHub Team

We proudly feature expert authors and reviewers from science, finance, and engineering fields.

<template v-if="$content">
  <div class="grid md:grid-cols-2 gap-6 mt-6">
    <div
      v-for="author in authors"
      :key="author._path"
      class="border p-4 rounded-lg bg-white dark:bg-gray-900 shadow"
    >
      <NuxtLink :to="author._path" class="flex items-center gap-4 mb-2">
        <img :src="author.image" class="w-16 h-16 rounded-full object-cover" />
        <div>
          <h2 class="text-lg font-semibold">{{ author.title }}</h2>
          <p class="text-sm text-gray-500">
            {{ author.role }}
            <span
              v-if="author.role.toLowerCase().includes('reviewer')"
              class="inline-block ml-2 text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded"
            >
              Reviewer
            </span>
            <span
              v-else-if="author.role.toLowerCase().includes('editor')"
              class="inline-block ml-2 text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded"
            >
              Editor
            </span>
          </p>
        </div>
      </NuxtLink>
      <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">{{ author.bio }}</p>

      <div v-if="author.calculators.length" class="mt-2 text-sm text-gray-600">
        <strong>Related Calculators:</strong>
        <ul class="list-disc list-inside">
          <li v-for="calc in author.calculators" :key="calc._path">
            <NuxtLink :to="calc._path" class="text-blue-600 underline">{{ calc.title }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: authorsRaw } = await useAsyncData('authors', () =>
  queryContent('/info/authors').only(['_path', 'title', 'role', 'bio', 'image']).find()
)

const { data: calculators } = await useAsyncData('calculators', () =>
  queryContent('/calculators').only(['_path', 'title', 'author', 'reviewed_by']).find()
)

const authors = authorsRaw.map((author) => {
  const name = author.title
  author.calculators = calculators.filter(c =>
    c.author === name || c.reviewed_by === name
  )
  return author
})
</script>