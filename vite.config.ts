import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(), // پلاگین Vue
  ],
  resolve: {
    alias: {
      '@': '/src', // تنظیم alias برای استفاده راحت‌تر از مسیرها
    },
  },
})
