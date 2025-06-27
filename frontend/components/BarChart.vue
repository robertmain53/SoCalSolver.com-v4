
<template>
  <div class="p-2">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
} from 'chart.js'

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title)

const props = defineProps<{ title: string, labels: string[], values: number[] }>()
const canvas = ref()

onMounted(() => {
  new Chart(canvas.value, {
    type: 'bar',
    data: {
      labels: props.labels,
      datasets: [{
        label: props.title,
        data: props.values,
        backgroundColor: '#2563eb'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: true, text: props.title }
      }
    }
  })
})
</script>
