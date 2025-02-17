<!-- <script setup>
import { ref, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

import { Line } from 'vue-chartjs'

// 🔹 Chart Data (Reactive)
const chartData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    {
      label: 'Sales',
      data: [10, 20, 30, 40, 50],
      borderColor: 'blue',
      borderWidth: 2,
    },
  ],
})
const xxxx = ref([20, 30, 15, 40])
// 🔹 Chart Options
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: true,
})

// 🔹 Reference for Chart Instance
const chartRef = ref(null)

// 🔄 Function to Update Chart Data
const chartKey = ref(0)
const updateChart = () => {
  //const newData = chartData.value.datasets[0].data.slice().reverse()

  // Assign a new object to trigger reactivity
  const ww = chartData.value.datasets[0].data.map((x) => x).slice()
  chartData.value.datasets[0].data = ww.reverse() // New Data
  chartKey.value++
  //chartRef.value.chart.update() // Refresh Chart
}

onMounted(() => {
  console.log('Chart Loaded!')
})
</script>

<template>
  <div>
    <Line :data="chartData" :options="chartOptions" ref="chartRef" :key="chartKey" />
    <button @click="updateChart">Update Chart</button>
  </div>
</template> -->

<script lang="ts" setup>
import { Chart, registerables } from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom'
import { ref } from 'vue'
import { Line } from 'vue-chartjs'
Chart.register(...registerables, zoomPlugin)
// برچسب‌های محور x
//const labels = ref([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

//const count = ref(0); // تعریف state با ref
// const points = ref({
//   w: [
//     0, 120, 240, 220, 219, 210, 218, 220, 222, 208, 209, 215, 218, 228, 231, 225, 228, 238, 243,
//     248, 260, 252, 250, 263, 270, 261, 265, 275, 270, 279, 273, 288, 290, 294, 298, 300, 290, 301,
//     308, 315, 320, 318, 326, 330, 337,
//   ],
//   xx: [
//     0.0, 0.1, 1, 2, 0.5, 0.7, 0.6, 0.65, 0.7, 0.65, 0.6, 1.2, 1.6, 1, 1.8, 2.2, 2.4, 2.8, 2.1, 1.8,
//     1.4, 1.1, 0.9, 0.3, 0.8, 1.4, 1.8, 2.1, 1.3, 2.7, 2.9, 3.4, 3.8, 3.5, 2.6, 2.8, 2.4, 2.1, 1.4,
//     1.9,
//   ],
//   y: [
//     25, 23, 21, 18, 14, 9, 7, 4, 1, -3, -2, -5, -8, -2, 2, 6, 9, 11, 16, 18, 24, 26, 29, 34, 36, 32,
//     28, 35, 39, 43, 39, 33, 29, 27, 23, 19, 17, 14, 10, 9, 6, 3, 1, 0, -2,
//   ],
//   z: [
//     24, 26, 29, 31, 37, 36, 35, 40, 41, 39, 43, 50, 53, 49, 46, 43, 40, 38, 36, 32, 36, 39, 46, 50,
//     45, 40, 49, 58, 64, 66, 69, 73, 63, 60, 55, 51, 48, 40, 30, 20, 10,
//   ],
// })
// // داده‌های نمودار
// const chartData = ref({
//   labels: Array.from(Array(points.value.w.length).keys()),
//   datasets: [
//     {
//       label: 'ولتاژ',
//       backgroundColor: 'rgb(255,99,132)',
//       borderColor: 'rgb(255,99,132)',
//       data: points.value.w,
//       yAxisID: 'w',
//       fill: false,
//       pointRadius: 1,
//       pointHoverRadius: 1,
//       borderWidth: 2,
//       tension: 0.1,
//     },
//     {
//       label: 'آمپر',
//       backgroundColor: 'rgb(20,50,90)',
//       borderColor: 'rgb(10,40,80)',
//       data: points.value.xx,
//       yAxisID: 'xx',
//       fill: false,
//       pointRadius: 1,
//       pointHoverRadius: 1,
//       borderWidth: 3,
//       borderDash: [5, 5],
//     },
//     {
//       label: 'دمای 1',
//       backgroundColor: 'rgb(100,150,200)',
//       borderColor: 'rgb(90,140,190)',
//       data: points.value.y,
//       yAxisID: 'y',
//       fill: false,
//       pointRadius: 1,
//       pointHoverRadius: 1,
//       borderWidth: 3,
//       borderDash: [1, 5],
//     },
//     {
//       label: 'دمای 2',
//       backgroundColor: 'rgb(255,165,0)',
//       borderColor: 'rgb(255,140,0)',
//       data: points.value.z,
//       yAxisID: 'z',
//       fill: false,
//       pointRadius: 1,
//       pointHoverRadius: 1,
//       borderWidth: 3,
//       tension: 0.4,
//     },
//   ],
// })
const generateRandomData = (length) => Array.from({ length }, () => Math.random() * 100) // تولید داده تصادفی

const numberOfLines = 40
const dataLength = 50 // تعداد نقاط در هر خط

const chartData = ref({
  labels: Array.from({ length: dataLength }, (_, i) => i), // برچسب‌ها از ۰ تا ۴۹
  datasets: Array.from({ length: numberOfLines }, (_, i) => ({
    label: `خط ${i + 1}`,
    backgroundColor: `hsl(${i * 9}, 70%, 50%)`, // رنگ‌های متفاوت
    borderColor: `hsl(${i * 9}, 70%, 50%)`,
    data: generateRandomData(dataLength),
    fill: false,
    pointRadius: 0.5,
    pointHoverRadius: 1,
    borderWidth: 1.5,
    tension: 0,
    spanGaps: true,
    parsing: true,
    borderDash: i % 2 === 0 ? [5, 5] : [], // خطوط یک در میان خط‌چین
  })),
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: true,
  animation: false,
  plugins: {
    zoom: {
      pan: {
        enabled: true,
        mode: 'x',
      },
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        mode: 'x',
      },
    },
  },
  scales: {
    x: {
      min: 0,
      max: 100,
    },
    y: {
      min: 0,
      max: 100,
    },
  },
})

const chartRef = ref(null)

// 🔄 Function to Update Chart Data
const chartKey = ref(0)
// const updateChart = () => {
//   let len = 0
//   chartData.value.datasets.forEach((dataset) => {
//     const xxx = dataset.data.slice()
//     xxx.push(Math.random() * 100)
//     len = xxx.length
//     dataset.data = xxx
//   })
//   console.log(len)
//   chartData.value.labels = Array.from(Array(len).keys())
//   chartKey.value++
// }
const updateChart = () => {
  const dataLength = 3600 // تعداد نقاطی که اضافه می‌شود
  chartData.value.datasets.forEach((dataset) => {
    dataset.data = Array.from({ length: dataLength }, () => Math.random() * 100) // تولید داده تصادفی
  })
  chartData.value.labels = Array.from({ length: dataLength }, (_, i) => i) // برچسب‌های جدید
  chartKey.value++ // کلید را تغییر می‌دهیم تا Vue، چارت را رندر کند
}
</script>

<template>
  <div class="">
    <h2>ChartJS</h2>
    <button class="button_update" @click="updateChart">Update Chart</button>
    <Line class="chart" :data="chartData" :options="chartOptions" ref="chartRef" :key="chartKey" />
  </div>
</template>

<style scoped>
.button_update {
  color: rgb(0, 0, 0);
  background: rgb(56, 124, 139);
}

.chart {
  width: 100%;
  height: 100%; /* تنظیم ارتفاع */
  overflow: hidden;
  position: relative;
  padding: 20px;
  margin-top: 20px; /* فاصله از بالای صفحه */
}
</style>
