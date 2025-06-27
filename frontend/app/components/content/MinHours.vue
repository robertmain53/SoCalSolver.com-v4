
<script setup>

import { ref } from 'vue';

const hours = ref(0);
const minutes = ref(0);
const minutesFromHours = ref(0);
const hoursFromMinutes = ref(0);

const convertToMinutes = () => {
  minutesFromHours.value = hours.value * 60;
};

const convertToHours = () => {
  hoursFromMinutes.value = minutes.value / 60;
};
</script>

<template>ccc
  <div class="calculator-container">
    <h2>Time Conversion Calculator</h2>
    <div class="conversion-form">
      <div class="form-group">
        <label for="hours">Hours:</label>
        <input type="number" id="hours" v-model.number="hours" @input="convertToMinutes" />
        <p>{{ hours }} hours = {{ minutesFromHours }} minutes</p>
      </div>
      <div class="form-group">
        <label for="minutes">Minutes:</label>
        <input type="number" id="minutes" v-model.number="minutes" @input="convertToHours" />
        <p>{{ minutes }} minutes = {{ hoursFromMinutes.toFixed(2) }} hours</p>
      </div>
    </div>
  </div>
</template>


 
<style scoped>
.calculator-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.conversion-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

p {
  margin-top: 10px;
  font-size: 1rem;
  color: #333;
}
</style>