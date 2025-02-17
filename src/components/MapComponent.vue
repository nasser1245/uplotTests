<template>
  <div class="map-box">
    <div id="map" class="map-container"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import L from 'leaflet' // وارد کردن کتابخانه Leaflet

onMounted(() => {
  // ایجاد نقشه با موقعیت اولیه ایران
  const map = L.map('map').setView([32.4279, 53.688], 5) // موقعیت ایران (عرض جغرافیایی: 32.4279, طول جغرافیایی: 53.6880)

  // افزودن TileLayer با لینک به OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map)

  // افزودن یک مارکر به نقشه (به عنوان مثال در تهران)
  L.marker([35.6892, 51.389]).addTo(map).bindPopup('تهران').openPopup()
})
</script>

<style scoped>
/* استایل برای باکس نقشه */
.map-box {
  width: 500px; /* عرض باکس نقشه */
  height: 400px; /* ارتفاع باکس نقشه */
  margin: 20px auto; /* قرار دادن باکس در وسط صفحه */
  padding: 10px; /* فضای داخلی */
  background-color: #fff; /* رنگ پس‌زمینه سفید برای باکس */
  border-radius: 12px; /* گوشه‌های باکس منحنی */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* سایه برای زیبایی */
}

/* استایل برای container نقشه */
.map-container {
  width: 100%;
  height: 100%; /* نقشه به طور کامل داخل باکس قرار می‌گیرد */
  border-radius: 8px; /* گوشه‌های منحنی */
}

/* افزودن انیمیشن برای hover روی نقشه */
.map-container:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2); /* سایه هنگام hover */
}
</style>
