<template>
  <div class="page-content" @click="closeNavbar">
    <button class="toggle-btn" @click.stop="toggleNavbar">☰</button>

    <nav class="navbar" :class="{ open: isOpen }" @click.stop>
      <button class="close-btn" @click="closeNavbar">✖</button>
      <div>
        <img src="../assets/eastcoolicon.ico" width="150px" />
      </div>
      <ul class="nav-links">
        <li><router-link to="/">خانه</router-link></li>
        <li><router-link to="/userlist">لیست کاربران</router-link></li>
        <li><router-link to="/chart">چارت</router-link></li>
        <li><router-link to="/about">درباره ما</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isOpen = ref(false)

// باز و بسته کردن نوار ناوبری
const toggleNavbar = () => {
  isOpen.value = !isOpen.value
}

// بستن نوار ناوبری
const closeNavbar = () => {
  isOpen.value = false
}

// بررسی کلیک خارج از نوار ناوبری
const closeNavbarOnClickOutside = (event) => {
  if (!event.target.closest('.navbar') && isOpen.value) {
    closeNavbar()
  }
}

// ثبت رویداد در هنگام لود شدن کامپوننت
onMounted(() => {
  document.addEventListener('click', closeNavbarOnClickOutside)
})

// حذف رویداد هنگام خروج از کامپوننت
onBeforeUnmount(() => {
  document.removeEventListener('click', closeNavbarOnClickOutside)
})
</script>

<style scoped>
.page-content {
  direction: rtl;
  text-align: right;
}

.toggle-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #1c304f;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 20px;
  cursor: pointer;
  border-radius: 5px;
}

.navbar {
  position: fixed;
  top: 0;
  right: -250px;
  width: 250px;
  height: 100vh;
  background: #142135;
  color: #deb887;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px 0 0 10px;
  transition: right 0.3s ease-in-out;
}

.navbar.open {
  right: 0;
}

.close-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  background: none;
  border: none;
  font-size: 20px;
  color: white;
  cursor: pointer;
}

.nav-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0px;
  margin-top: 10px;
  align-items: flex-end;
  direction: rtl;
}

.nav-links a {
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  transition: 0.3s;
  text-align: right;
  display: block;
  width: 100%;
}

.nav-links a:hover {
  background: #03a29a;
  color: #027771;
}
</style>
