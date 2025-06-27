<template>
  <div class="calculator-container">
    <h2>Mortgage Payment Calculator</h2>
    <form @submit.prevent="calculatePayment">
      <div class="form-group">
        <label for="loanAmount">Loan Amount ($):</label>
        <input type="number" id="loanAmount" v-model.number="loanAmount" required />
      </div>
      <div class="form-group">
        <label for="interestRate">Annual Interest Rate (%):</label>
        <input type="number" id="interestRate" v-model.number="interestRate" step="0.01" required />
      </div>
      <div class="form-group">
        <label for="loanTerm">Loan Term (years):</label>
        <input type="number" id="loanTerm" v-model.number="loanTerm" required />
      </div>
      <button type="submit">Calculate</button>
    </form>
    <div v-if="monthlyPayment !== null" class="result">
      <h3>Estimated Monthly Payment: ${{ monthlyPayment.toFixed(2) }}</h3>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const loanAmount = ref(0);
const interestRate = ref(0);
const loanTerm = ref(0);
const monthlyPayment = ref(null);

const calculatePayment = () => {
  const principal = loanAmount.value;
  const monthlyInterestRate = (interestRate.value / 100) / 12;
  const numberOfPayments = loanTerm.value * 12;

  if (monthlyInterestRate === 0) {
    monthlyPayment.value = principal / numberOfPayments;
  } else {
    monthlyPayment.value = (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
  }
};
</script>

<style scoped>
.calculator-container {
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
  text-align: center;
}
</style>