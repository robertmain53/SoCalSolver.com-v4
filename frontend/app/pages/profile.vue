<script setup>
definePageMeta({ middleware: 'auth' })
const auth = useAuthStore()
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div>
      <h1 class="text-xl">Welcome, {{ auth.user?.name }}</h1>
      <LogoutButton />
    </div>
  </div>
</template>
