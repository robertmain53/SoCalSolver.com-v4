<template>
<RevisionedBy :data="frontmatter.revisionedBy" />
  <div class="calculator-page container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">{{ doc.title }}</h1>

    <p class="text-gray-600 mb-2">{{ doc.description }}</p>

    <component :is="componentName" v-if="componentName" class="my-6" />

    <ContentRenderer :value="doc" class="prose dark:prose-invert mt-4" />

    <FormulaBreakdown
      v-if="doc.inputs && doc.formula && doc.result"
      :inputs="doc.inputs"
      :formula="doc.formula"
      :result="doc.result"
      class="mt-10"
/>


    <div v-if="doc.related?.length" class="mt-10 border-t pt-6">
      <h2 class="text-xl font-semibold mb-4">Related Calculators</h2>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <li v-for="calc in doc.related" :key="calc.slug">
          <NuxtLink
            :to="`/${calc.language || lang}/${calc.slug.replace(/\.\w+$/, '')}`"
            class="text-blue-600 hover:underline"
          >
            {{ calc.title }}
          </NuxtLink>
          <p class="text-sm text-gray-500">{{ calc.description }}</p>
        </li>
      </ul>
    </div>


    <div v-if="related.length" class="mt-10 border-t pt-6">
      <h2 class="text-xl font-semibold mb-4">Related Calculators</h2>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <li v-for="calc in related" :key="calc.slug">
          <NuxtLink
            :to="`/${calc.language}/${calc.slug.split('.')[0]}`"
            class="text-blue-600 hover:underline"
          >
            {{ calc.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>

    <div class="mt-10 border-t pt-6">
      <h2 class="text-xl font-semibold mb-4">Share or Embed This Calculator</h2>
      <button @click="showEmbed = !showEmbed" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 mb-4">
        {{ showEmbed ? 'Hide' : 'Show' }} Embed Code
      </button>
      <div v-if="showEmbed" class="bg-gray-100 p-4 rounded border text-sm">
        <p class="mb-2">Embed this calculator on your website:</p>
        <textarea class="w-full h-32 p-2 rounded border" readonly>{{ embedCode }}</textarea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { slug, lang } = route.params
const query = useRoute().query

const { buildCalculatorGraph, getRelatedCalculators } = await import('~/lib/seoGraph')
const { generateEmbedCode } = await import('~/lib/embedUtils')

const { data: doc } = await useAsyncData('doc', () =>
  queryContent(`/${slug}.${lang}`).findOne()
)

const componentName = computed(() => {
  try {
    return resolveComponent(slug)
  } catch (e) {
    return null
  }
})

const graph = buildCalculatorGraph()
const related = getRelatedCalculators(`${slug}.${lang}`, graph)

const savedState = query.state ? JSON.parse(decodeURIComponent(query.state)) : {}

const showEmbed = ref(false)
const embedCode = generateEmbedCode(slug, lang, savedState)

useHead({
  title: () => doc.value?.title || 'Calculator',
  meta: [
    { name: 'description', content: doc.value?.description || '' },
    { property: 'og:title', content: doc.value?.title || '' },
    { property: 'og:description', content: doc.value?.description || '' },
    { name: 'language', content: lang }
  ]
})
</script>