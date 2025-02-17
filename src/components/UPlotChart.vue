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
    const variation = Math.random(20)
    options[j] = {
      label: `دمای ${j + 1}`,
      stroke: '#' + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, '0'),
      width: 2,
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

const xAxis = Array.from({ length: numPoints }, (_, i) => (i / numPoints) * numPoints)
console.log(xAxis)

// Generate Y-values
const ySeries = generateSmoothData(numSeries, numPoints)
const chartData = ref([xAxis, ...ySeries.data])

const options = {
  title: `${numSeries} Series Chart with X [0-${numPoints - 1}]`,
  width: 1000,
  height: 300,
  scales: {
    x: { time: false, min: 0, max: numPoints },
    y: { auto: true },
  },
  series: [{ label: 'X Axis' }, ...ySeries.options],
  // axes: [
  //   { space: 40 }, // X-axis spacing
  //   { space: 50 }, // Y-axis spacing
  // ],
  hooks: {
    init: [
      (u) => {
        let xMin = u.scales.x.min
        let xMax = u.scales.x.max

        chartContainer.value.addEventListener('wheel', (e) => {
          e.preventDefault() // Prevent page scrolling
          console.log('Mouse wheel event')
          const zoomFactor = 0.1 // Adjust zoom speed
          const scale = e.deltaY > 0 ? 1 + zoomFactor : 1 - zoomFactor

          const range = xMax - xMin
          const mid = xMin + range / 2
          const newRange = range * scale
          xMin = mid - newRange / 2
          xMax = mid + newRange / 2

          u.setScale('x', { min: xMin, max: xMax })
        })

        chartContainer.value.addEventListener('mousemove', (e) => {
          if (!isDragging) return

          const deltaX = e.clientX - startX
          const shift = (deltaX * (xMax - xMin)) / 600
          xMin -= shift
          xMax -= shift
          startX = e.clientX

          u.setScale('x', { min: xMin, max: xMax })
        })

        let isDragging = false
        let startX = 0

        chartContainer.value.addEventListener('mouseup', () => {
          isDragging = false
        })

        chartContainer.value.addEventListener('mouseleave', () => {
          isDragging = false
        })
      },
    ],
  },
}

onMounted(() => {
  if (chartContainer.value) {
    chartInstance = new uPlot(options, chartData.value, chartContainer.value)
  }
})

// Watch for data changes (for real-time updates)
watch(
  chartData,
  (newData) => {
    if (chartInstance) {
      chartInstance.setData(newData)
    }
  },
  { deep: true },
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
