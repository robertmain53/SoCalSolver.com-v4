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
    const vars = inputs.value
      .map(f => `const ${f.name} = Number(values["${f.name}"] || 0);`)
      .join('\n');
    const expr = formula.value.includes('=') ? formula.value.split('=')[1] : formula.value;
    return Function('values', `${vars}\nreturn ${expr}`)(values.value);
  } catch (e) {
    console.error(e);
    return 'Error';
  }
}

</script>
