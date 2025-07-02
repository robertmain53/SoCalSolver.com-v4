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
