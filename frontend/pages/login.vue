<template>
  <div class="login-page">
    <form @submit.prevent="submit">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';  // Ensure an auth Pinia store is defined in /stores/auth.ts

const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();

const submit = async () => {
  try {
    await authStore.login({ email: email.value, password: password.value });
    router.push('/');
  } catch (error) {
    console.error('Login failed:', error);
  }
};
</script>
