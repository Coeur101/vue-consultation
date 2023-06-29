import { fileURLToPath, URL } from 'node:url'

import { ConfigEnv, loadEnv, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  let env = loadEnv(mode, process.cwd())
  return {
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
        dts: false,
        resolvers: [VantResolver()]
      }),
      createSvgIconsPlugin({
        // 指定图标文件夹，绝对路径（NODE代码）
        iconDirs: [path.resolve(process.cwd(), 'src/icons')]
      })
    ],
    server: {
      proxy: {
        /*  [env.VITE_APP_BASE_API]: {
          changeOrigin: true,
          target: env.VITE_SERVE,
          rewrite: (path) => path.replace(/^\/api/, '')
        } */
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
}
