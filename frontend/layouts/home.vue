<template>
  <div>
    <Navbar />
    <main class="text-gray-800 dark:text-gray-100" class="max-w-7xl mx-auto px-4">
      <slot />
    </main>
    <LazyAppFooter />
  </div>
</template>
