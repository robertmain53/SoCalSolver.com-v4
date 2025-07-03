<template>
  <section class="max-w-2xl mx-auto py-12 px-4">
    <h1 class="text-3xl font-bold mb-4">{{ t('contact.title') }}</h1>
    <p class="mb-6 text-gray-700 dark:text-gray-300">{{ t('contact.intro') }}</p>
    <form class="space-y-4" @submit.prevent="onSubmit">
      <div>
        <label class="block mb-1 font-semibold" for="name">{{ t('contact.name') }}</label>
        <input v-model="form.name" id="name" type="text" required class="w-full p-2 border rounded" />
      </div>
      <div>
        <label class="block mb-1 font-semibold" for="email">{{ t('contact.email') }}</label>
        <input v-model="form.email" id="email" type="email" required class="w-full p-2 border rounded" />
      </div>
      <div>
        <label class="block mb-1 font-semibold" for="message">{{ t('contact.message') }}</label>
        <textarea v-model="form.message" id="message" required class="w-full p-2 border rounded h-32" />
      </div>
      <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">{{ t('contact.send') }}</button>
      <p v-if="status" class="mt-2 text-green-600">{{ status }}</p>
    </form>
    <div class="mt-8 text-sm text-gray-500 dark:text-gray-400">
      <p><strong>Email:</strong> info@socalsolver.com</p>
      <p><strong>{{ t('contact.address') }}:</strong> 123 Solver Ave, Los Angeles, CA</p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '#imports'
const { t } = useI18n()
const form = ref({ name: '', email: '', message: '' })
const status = ref('')
function onSubmit() {
  status.value = t('contact.thankyou')
  form.value = { name: '', email: '', message: '' }
}
</script>
