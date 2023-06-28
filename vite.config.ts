import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  // base:""服务器中放置打包代码的目录名
  plugins: [
    // 允许对props进行解构，开启解构语法糖
    // 加上此配置，进行解构后不会丢失响应式
    vue({
      reactivityTransform: true
    }),
    AutoImport({
      imports: 'vue'
    }),
    Components({
      resolvers: [VantResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
