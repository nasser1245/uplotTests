<script setup>
import { onMounted, ref, watch, onBeforeUnmount } from 'vue'
import uPlot from 'uplot'
import 'uplot/dist/uPlot.min.css'

const chartContainer = ref(null)
let chartInstance = null
const numSeries = 40
const numPoints = 1000

const generateSmoothData = (series = 2, points = 50) => {
  const data = new Array(series).fill(null).map(() => new Array(points))
  const options = []
  for (let j = 0; j < series; j++) {
    const start = Math.random() * 200 - 100
    const variation = Math.random() * 20
    const scale = `y${(j % 8) + 1}`
    options[j] = {
      label: `دمای ${j + 1}`,
      stroke: '#' + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, '0'),
      width: 2,
      scale: scale,
    }
    data[j][0] = start
    for (let i = 1; i < points; i++) {
      const prev = data[j][i - 1]
      const change = Math.random() * variation * 2 - variation
      data[j][i] = prev + change
    }
  }
  return { data, options }
}

const xAxis = Array.from({ length: numPoints }, (_, i) => i)
const ySeries = generateSmoothData(numSeries, numPoints)
const chartData = ref([xAxis, ...ySeries.data])

const yScales = {};
for (let i = 1; i <= 8; i++) {
  yScales[`y${i}`] = { auto: true };
}

const colors = ['#ff0000', '#0000ff', '#00ff00', '#ff8800', '#800080', '#8B4513', '#ff1493', '#00ffff'];
const yAxes = [];
for (let i = 1; i <= 8; i++) {
  yAxes.push({
    scale: `y${i}`,
    side: 3, // محورها در سمت راست
    label: `y${i}`,
    stroke: colors[i - 1],
    space: 15, // کاهش فاصله محورها
    size: 0,
    labelPos: 30, // جابجایی برچسب به سمت راست
    gap: 5,
    rotate: -50, // چرخش برچسب
  });
}

const options = {
  title: `${numSeries} Series Chart with Multiple Y Axes`,
  width: 1400,
  height: 700,
  scales: {
    x: { time: false, min: 0, max: numPoints },
    ...yScales,
  },
  // series: [{ label: 'X Axis' }, ...ySeries.options],
  series: [{ label: 'X Axis' }, 
           ...ySeries.options.map((option) => ({
             ...option,  // ویژگی‌های موجود در ySeries.options
             points: { size: 6 },  // اندازه نقاط داده‌ها را کوچک‌تر می‌کنیم
             width: 2,  // خط‌ها را نازک‌تر می‌کنیم
           }))
  ],
  axes: [{ space: 40 }, ...yAxes],
}

onMounted(() => {
  if (chartContainer.value) {
    chartInstance = new uPlot(options, chartData.value, chartContainer.value)
  } else {
    console.error("chartContainer is not available")
  }
})

watch(
  chartData,
  () => {
    if (chartInstance) {
      chartInstance.setData(chartData.value)
    }
  },
  { deep: true }
)

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>

<template>
  <div ref="chartContainer"></div>
</template>
