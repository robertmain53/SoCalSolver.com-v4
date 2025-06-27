<template>
  <div>
    <Navbar />
    <section class="text-gray-800 dark:text-gray-100" class="max-w-5xl mx-auto px-4 py-8">
      <h1 class="text-2xl font-semibold mb-4">Subcategory</h1>
      <slot />
    </section>
    <LazyAppFooter />
  </div>
</template>
