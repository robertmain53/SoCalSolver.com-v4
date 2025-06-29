<template>
  <div class="builder-page">
    <!-- Builder UI components -->
    <input v-model="expression" placeholder="Enter expression" />
    <button @click="evaluate">Evaluate</button>
    <div v-if="result">Result: {{ result }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const expression = ref<string>('');
const result = ref<string>('');

function evaluate() {
  try {
    // Caution: using eval for demonstration; consider replacing with a safe parser if needed
    result.value = eval(expression.value);
  } catch (err) {
    console.error(err);
    result.value = 'Error';
  }
}
</script>
