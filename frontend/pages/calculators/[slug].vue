<template>
  <div class="max-w-4xl mx-auto p-6">
    <nav class="text-sm mb-4 text-gray-500">
      <NuxtLink to="/" class="hover:underline text-blue-600">Home</NuxtLink> /
      <NuxtLink :to="`/category/${doc.category}`" class="hover:underline text-blue-600">
        {{ doc.category }}
      </NuxtLink> /
      <span class="text-gray-700 font-medium">{{ doc.title }}</span>
    </nav>

    <article>
      <ContentRenderer :value="doc" />
    </article>

    <div class="mt-10" v-if="related?.length">
      <h2 class="text-xl font-semibold mb-2">🧮 Related Calculators</h2>
      <ul class="list-disc pl-5">
        <li v-for="item in related" :key="item._path">
          <NuxtLink :to="item._path" class="text-blue-600 hover:underline">
            {{ item.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>

    
  </div>
</template>

<script setup>
import { useHead } from '#imports'

const route = useRoute()
const slug = route.params.slug

const { data: doc } = await useAsyncData('doc', () =>
  queryContent('/calculators')
    .where({ _extension: 'md', _path: `/calculators/${slug}` })
    .findOne()
)

const { data: related } = await useAsyncData(`related-${slug}`, async () => {
  if (!doc.value) return []
  const all = await queryContent('/calculators')
    .where({ _extension: 'md' })
    .find()

  return all.filter(item =>
    item._path !== `/calculators/${slug}` &&
    (item.category === doc.value.category ||
     (item.tags && doc.value.tags?.some(tag => item.tags.includes(tag))))
  ).slice(0, 5)
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `What is the purpose of the ${doc.title}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": doc.description || `Learn about ${doc.title} and how it helps users with calculations.`
            }
          },
          {
            "@type": "Question",
            "name": `How do I use the ${doc.title}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Use the ${doc.title} by filling in your values and reviewing the result instantly.`
            }
          }
        ]
      })
    }
  ]
})
</script>