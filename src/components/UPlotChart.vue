<script setup>
import { onMounted, ref, watch, onBeforeUnmount } from 'vue'
import uPlot from 'uplot'
import 'uplot/dist/uPlot.min.css'

const chartContainer = ref(null)
let chartInstance = null
const numSeries = 40
const numPoints = 3600

const generateSmoothData = (series = 2, points = 50) => {
  const data = new Array(series).fill(null).map(() => new Array(points))
  const options = []
  for (let j = 0; j < series; j++) {
    const start = Math.random() * 200 - 100
    const variation = Math.random() * 3
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

const xAxis = Array.from({ length: numPoints }, (_, i) => i)
const ySeries = generateSmoothData(numSeries, numPoints)
const chartData = ref([xAxis, ...ySeries.data])

const isDragging = ref(false)
const startX = ref(0)
const options = {
  title: `${numSeries} Series Chart with X [0-${numPoints - 1}]`,
  width: 1000,
  height: 300,
  scales: {
    x: { time: false, min: 0, max: numPoints - 1 },
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
        chartContainer.value.addEventListener('wheel', (e) => {
          e.preventDefault() // Prevent page scrolling
          let xMin = u.scales.x.min
          let xMax = u.scales.x.max
          if (xMin < 0 && xMax > numPoints && e.deltaY > 0) return
          console.log('Mouse wheel event')
          const scale = e.deltaY > 0 ? 1.2 : 0.8

          const range = xMax - xMin
          const mid = xMin + range / 2
          const newRange = range * scale
          xMin = mid - newRange / 2 < 0
          xMax = mid + newRange / 2
          if (xMin < 0) xMin = 0
          if (xMax >= numPoints) xMax = numPoints - 1
          u.setScale('x', { min: xMin, max: xMax })
          chartKey.value++
        })

        // ✅ Mouse Drag Panning (X-axis only)
        //let isDragging = false
        //let startX = 0

        chartContainer.value.addEventListener('mousedown', (e) => {
          isDragging.value = true
          startX.value = e.clientX
        })

        chartContainer.value.addEventListener('mousemove', (e) => {
          if (!isDragging.value) return

          const deltaX = e.clientX - startX.value
          const shift = (deltaX * (xMax - xMin)) / u.width

          xMin -= shift
          xMax -= shift
          startX.value = e.clientX

          u.setScale('x', { min: xMin, max: xMax })
        })

        chartContainer.value.addEventListener('mouseup', () => (isDragging.value = false))
        chartContainer.value.addEventListener('mouseleave', () => (isDragging.value = false))

        //let isDragging = false
        //let startX = 0
        // chartContainer.value.addEventListener('mousedown', (e) => {
        //   e.preventDefault()
        //   isDragging.value = true
        //   startX.value = e.clientX
        // })
        // chartContainer.value.addEventListener('mousemove', (e) => {
        //   e.preventDefault()

        //   if (!isDragging.value) return

        //   const deltaX = e.clientX - startX.value
        //   const shift = (deltaX * (xMax - xMin)) / 600
        //   xMin -= shift
        //   xMax -= shift
        //   startX.value = e.clientX

        //   u.setScale('x', { min: xMin, max: xMax })
        // })

        // chartContainer.value.addEventListener('mouseup', () => {
        //   e.preventDefault()

        //   isDragging.value = false
        // })

        // chartContainer.value.addEventListener('mouseleave', () => {
        //   e.preventDefault()

        //   isDragging.value = false
        // })
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
const chartKey = ref(0)
const resetZoom = () => {
  chartInstance.setScale('x', { min: 0, max: numPoints - 1 })
  chartInstance.setScale('y', { auto: true })
  chartKey.value++
}
</script>

<template>
  <button @click="resetZoom" :key="chartKey">Reset Zoom</button>
  <div ref="chartContainer"></div>
  <div style="height: 500px">test</div>
</template>
