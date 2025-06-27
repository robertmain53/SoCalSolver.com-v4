<template>
  <div>
    <Navbar />
    <article class="text-gray-800 dark:text-gray-100 dark:prose-invert max-w-4xl mx-auto px-4 py-8">
      <slot />
    </article>
    <LazyAppFooter />
  </div>
</template>
