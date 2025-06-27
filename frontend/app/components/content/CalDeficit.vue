<template>
  <div class="calculator">
    <h2>Calorie Deficit Weight Loss Calculator</h2>
    <form @submit.prevent="calculateWeightLoss">
      <div class="form-group">
        <label for="calorieDeficit">Daily Calorie Deficit:</label>
        <input type="number" id="calorieDeficit" v-model="calorieDeficit" required />
      </div>
      <button type="submit">Calculate</button>
    </form>
    <div v-if="weeklyWeightLoss !== null" class="result">
      <p>You can potentially lose <strong>{{ weeklyWeightLoss.toFixed(2) }}</strong> pounds in a week.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const calorieDeficit = ref(0);
const weeklyWeightLoss = ref(null);

const calculateWeightLoss = () => {
  const caloriesPerPound = 3500;
  weeklyWeightLoss.value = (calorieDeficit.value * 7) / caloriesPerPound;
};
</script>

<style scoped>
.calculator {
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
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
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
}
</style>