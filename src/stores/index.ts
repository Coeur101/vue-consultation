import { createPinia } from 'pinia'
import type { App } from 'vue'
// 导入数据持久化插件
import persist from 'pinia-plugin-persistedstate'
// 使用插件
export const pinia = createPinia()
pinia.use(persist)
export function registerStore(app: App<Element>) {
  app.use(pinia)
}
