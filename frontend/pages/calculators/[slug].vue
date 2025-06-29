<template>
  <!-- Page content for the calculator goes here -->
  <div class="calculator-page">
    <!-- ... -->
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const schemaData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Calculator: " + (route.params.slug ?? "Calculator")
  // ... additional structured data properties as needed
};

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(schemaData)
    }
  ]
});
</script>
