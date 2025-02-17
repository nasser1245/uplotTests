<template>
  <div class="slider">
    <img :src="images[currentIndex]" class="slide-image" alt="اسلایدر" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// مسیرها را به صورت نسبی و از طریق import بارگذاری می‌کنیم
const images = [
  new URL('../assets/images/image8.jpg', import.meta.url).href,
  new URL('../assets/images/image9.jpg', import.meta.url).href,
  new URL('../assets/images/image10.jpg', import.meta.url).href,
]

const currentIndex = ref(0)
let interval = null

onMounted(() => {
  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length
  }, 3000) // تغییر عکس هر 3 ثانیه
})

onUnmounted(() => {
  clearInterval(interval) // پاک کردن تایمر هنگام خروج از صفحه
})
</script>

<style scoped>
.slider {
  width: 100%;
  height: 100%; /* تنظیم ارتفاع */
  overflow: hidden;
  position: relative;
  padding: 20px;
  margin-top: 20px; /* فاصله از بالای صفحه */
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* برای نمایش کامل عکس */
  border-radius: 10px;
}
</style>
