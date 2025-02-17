<template>
  <p>این لیست تعداد محدودی از کاربران تکران را نمایش میدهد .</p>
  <div class="user-list">
    <h2>لیست کاربران تکران مبرد</h2>

    <!-- نمایش پیام در صورت دریافت نشدن داده -->
    <p v-if="loading" class="loading-text">در حال دریافت اطلاعات...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <!-- نمایش جدول کاربران -->
    <table v-if="users.length">
      <thead>
        <tr>
          <th>نام</th>
          <th>نام خانوادگی</th>
          <th>شماره تلفن</th>
          <th>فعال بودن</th>
          <th>تاریخ ایجاد</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.phoneNumber }}</td>
          <td>{{ user.isActive ? 'فعال' : 'غیر فعال' }}</td>
          <td>{{ new Date(user.createdOnUtc).toLocaleDateString() }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>هیچ کاربری یافت نشد.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// متغیرها برای وضعیت لودینگ و خطا
const users = ref([]) // ذخیره لیست کاربران
const loading = ref(true) // نمایش وضعیت دریافت اطلاعات
const error = ref(null) // خطایابی

// تابع دریافت لیست کاربران از API
const fetchUsers = async () => {
  try {
    const response = await axios.get(
      'https://localhost:7206/api/user/User/paged', // آدرس API شما
      {
        params: {
          pageIndex: 1, // به‌عنوان مثال
          pageSize: 10, // به‌عنوان مثال
        },
      },
    )

    // بررسی وضعیت موفقیت دریافت داده‌ها
    if (response.data.succeeded) {
      console.log(response.data) // برای بررسی صحت داده‌ها در کنسول
      users.value = response.data.data // ذخیره کاربران در متغیر
    } else {
      error.value = 'داده‌ها بارگذاری نشد!'
    }
  } catch (err) {
    console.error('خطا در دریافت داده‌ها: ', err) // نمایش خطا
    error.value = `مشکلی در دریافت اطلاعات پیش آمد! خطا: ${err.message}`
  } finally {
    loading.value = false // پس از دریافت، لودینگ غیرفعال شود
  }
}

// دریافت داده هنگام لود شدن کامپوننت
onMounted(fetchUsers)
</script>

<style scoped>
.user-list {
  width: 100%;
  max-width: none;
  margin: 50px auto;
  padding: 30px;
  background: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: right;
  color: black;
  font-family: 'Arial', sans-serif;
  direction: rtl;
  box-sizing: border-box;
}

h2 {
  font-size: 24px;
  color: #2c3a54;
  margin-bottom: 20px;
}

.loading-text {
  color: #2c3a54;
  font-weight: bold;
}

.error {
  color: #e74c3c;
  font-size: 16px;
  margin-top: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  border: 2px solid #2c3a54;
}

th,
td {
  padding: 12px;
  border: 2px solid #2c3a54;
  text-align: right;
}

th {
  background-color: #2c3a54;
  color: white;
}

td {
  background-color: #fff;
}

td,
th {
  font-size: 14px;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:hover {
  background-color: #f1f1f1;
}

@media (max-width: 600px) {
  .user-list {
    padding: 20px;
    margin: 20px;
  }

  h2 {
    font-size: 20px;
  }

  td,
  th {
    font-size: 15px;
  }
}
</style>
