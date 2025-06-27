<template>
  <div class="max-w-md mx-auto p-4 mt-10 border rounded-xl shadow">
    <h2 class="text-xl font-bold mb-4">🔐 Admin Login</h2>

    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" class="input mb-2 w-full" />
      <input v-model="password" type="password" placeholder="Password" class="input mb-4 w-full" />
      <button type="submit" class="btn w-full">Login</button>
      <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

async function login() {
  error.value = ''
  try {
    const res = await fetch(`${useRuntimeConfig().public.apiBase}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    })

    if (!res.ok) throw new Error('Invalid credentials')

    const { token } = await res.json()
    localStorage.setItem('auth_token', token)
    router.push('/admin/dashboard')
  } catch (err) {
    error.value = err.message
  }
}
</script>

<style scoped>
.input {
  @apply border px-3 py-2 rounded w-full;
}
.btn {
  @apply bg-blue-600 text-white py-2 rounded hover:bg-blue-700;
}
</style>