<template>
  <div>
    <Navbar />
    <main class="text-gray-800 dark:text-gray-100" class="prose dark:prose-invert mx-auto px-4 py-8">
      <slot />
    </main>
    <LazyAppFooter />
  </div>
</template>
