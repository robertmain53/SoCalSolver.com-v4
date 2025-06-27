<template>
  <div>
    <Navbar />
    <section class="text-gray-800 dark:text-gray-100 max-w-6xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Category</h1>
      <slot />
    </section>
    <LazyAppFooter />
  </div>
</template>
