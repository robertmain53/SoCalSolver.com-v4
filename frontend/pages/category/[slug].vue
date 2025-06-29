<template>
  <!-- Page content for the category goes here -->
  <div class="category-page">
    <!-- ... -->
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": route.params.slug,
};

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(schema),
    },
  ],
});
</script>
