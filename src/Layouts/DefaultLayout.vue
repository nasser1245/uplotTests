<script setup lang="ts">
//import NavBar from '../components/NavBar.vue' // وارد کردن Navbar
//import MapComponent from '../components/MapComponent.vue'
//import ImageSlider from '@/components/ImageSlider.vue'
</script>

<template>
  <div class="layout">
    <!-- <header class="header_style">
      <NavBar />
      <ImageSlider />
    </header> -->

    <main class="main-content">
      <slot></slot>
    </main>

    <!-- <footer class="footer">
      <MapComponent />
    </footer> -->
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  font-family: Arial, sans-serif;
}

.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
header {
  color: white;
  padding: 10px;
  text-align: center;
  flex-shrink: 0;
}

.header_style {
  margin-top: 50px;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
}

footer {
  padding: 10px;
  text-align: center;
  flex-shrink: 0;
}

footer p {
  margin: 10px 0;
}

@media (max-width: 768px) {
  .header_style {
    margin-top: 20px;
    padding: 5px;
  }

  .main-content {
    padding: 10px;
  }

  footer {
    padding: 5px;
  }
}

@media (max-width: 1024px) {
  .header_style {
    margin-top: 30px;
  }

  .main-content {
    padding: 15px;
  }

  footer {
    padding: 10px;
  }
}
</style>
