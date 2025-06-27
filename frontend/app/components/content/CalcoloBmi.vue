<template>
  <div class="bmi-calculator">
    <h2>Calcolatore BMI</h2>
    <form @submit.prevent="calculateBMI">
      <div class="form-group">
        <label for="weight">Peso (kg):</label>
        <input type="number" id="weight" v-model="weight" required />
      </div>
      <div class="form-group">
        <label for="height">Altezza (cm):</label>
        <input type="number" id="height" v-model="height" required />
      </div>
      <button type="submit">Calcola</button>
    </form>
    <div v-if="bmi !== null" class="result">
      <p>Il tuo BMI è: {{ bmi.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const weight = ref(null);
const height = ref(null);
const bmi = ref(null);

const calculateBMI = () => {
  if (weight.value && height.value) {
    const heightInMeters = height.value / 100;
    bmi.value = weight.value / (heightInMeters * heightInMeters);
  }
};
</script>

<style scoped>
.bmi-calculator {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.result {
  margin-top: 20px;
  font-size: 1.2em;
  text-align: center;
}
</style>