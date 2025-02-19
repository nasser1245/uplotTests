<template>
  <div>
    <h1>دیتای آنلاین</h1>
    <ul>
      <li v-for="item in testValues" :key="item.testId">
        {{ item.testId }} - {{ item.lastProcessedPlcCount }} - {{ item.lastProcessedPlcTime }}
      </li>
    </ul>
  </div>
</template>

<script>
import * as signalR from '@microsoft/signalr';

export default {
  data() {
    return {
      testValues: []  // لیست داده‌ها که از SignalR دریافت می‌شود
    };
  },
  mounted() {
    // آدرس سرور SignalR
    const serverUrl = "http://localhost:7234/onlineDataHub";

    // ایجاد اتصال SignalR
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(serverUrl, {
        transport: signalR.HttpTransportType.WebSockets,  // استفاده از WebSockets
        withCredentials: true  // اگر نیاز به اعتبارسنجی دارید
      })
      .withAutomaticReconnect()  // اتصال خودکار در صورت قطع ارتباط
      .build();

    // متد دریافت داده‌ها از سرور
    connection.on("ReceiveData", (data) => {
      this.testValues = data;  // به‌روزرسانی داده‌ها
      console.log("دیتای آنلاین: ", data);
    });

    // شروع اتصال SignalR
    connection.start()
      .then(() => {
        console.log("اتصال به SignalR برقرار شد.");
      })
      .catch(err => {
        console.error("خطا در اتصال: ", err);
      });
  }
};
</script>
