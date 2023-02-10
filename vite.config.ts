import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  server: {
    port: 5000, // 你需要定义的端口号
    proxy: {
      "/code": {
        target: "http://127.0.0.1:8000/",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
})
