<script setup>
import { useAuthStore } from '#imports'
const auth = useAuthStore()
const name = ref('')
function handleLogin() {
  if (name.value.trim()) {
    auth.login(name.value)
    return navigateTo('/')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="bg-white dark:bg-gray-900 p-8 shadow-md rounded">
      <input v-model="name" type="text" placeholder="Enter your name" class="input mb-4" />
      <button @click="handleLogin" class="btn">Login</button>
    </div>
  </div>
</template>
