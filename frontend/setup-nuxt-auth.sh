#!/usr/bin/env bash

set -e

echo "🚀 Installing @sidebase/nuxt-auth..."
pnpm add @sidebase/nuxt-auth

echo "✅ Removing old server middleware that caused 401s..."
rm -f server/middleware/admin-protectedAuth.ts
rm -f server/middleware/admin--protectedAuth.ts

echo "✅ Creating auth.config.ts..."
cat <<EOT > auth.config.ts
import { defineAuthConfig } from "@sidebase/nuxt-auth"

export default defineAuthConfig({
  // Example: credentials provider for email/password login
  // You will customize this with your own backend later
  providers: [
    {
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        // Here you can call your backend API to verify credentials
        // For now, a dummy user if username === "admin" and password === "password"
        if (
          credentials?.username === "admin" &&
          credentials?.password === "password"
        ) {
          return { id: "1", name: "Admin User" }
        }
        return null
      }
    }
  ]
})
EOT

echo "✅ Creating a plugin to expose useAuth()..."
mkdir -p plugins
cat <<EOT > plugins/nuxt-auth.ts
import { defineNuxtPlugin } from "#app";
import { useAuth } from "@sidebase/nuxt-auth";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      auth: useAuth()
    }
  };
});
EOT

echo "✅ Creating example protected page..."
mkdir -p pages/admin
cat <<EOT > pages/admin/index.vue
<script setup>
const { status, signIn, data } = useAuth()
if (status.value === 'unauthenticated') {
  navigateTo('/login')
}
</script>

<template>
  <div class="p-4">
    <h1>Admin Dashboard</h1>
    <p v-if="status==='authenticated'">Welcome {{ data?.user?.name }}</p>
  </div>
</template>
EOT

echo "✅ Creating example login page..."
cat <<EOT > pages/login.vue
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
EOT

echo "✅ All done!"
echo "👉 You can now run 'pnpm dev' and test:"
echo "   - Go to /admin (should redirect to /login)"
echo "   - Login with username 'admin' and password 'password'"
echo "   - You will be redirected to /admin and see 'Welcome Admin User'"
