<script setup>
import { ref } from 'vue'
const username = ref('')
const password = ref('')
const { signIn } = useAuth()

const doLogin = async () => {
  await signIn('credentials', { username: username.value, password: password.value }, { callbackUrl: '/admin' })
}
</script>

<template>
  <div class="p-4">
    <h1>Login</h1>
    <input v-model="username" placeholder="Username" class="border p-2" />
    <input v-model="password" type="password" placeholder="Password" class="border p-2" />
    <button @click="doLogin" class="bg-blue-500 text-white px-4 py-2">Login</button>
  </div>
</template>
