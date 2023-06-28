import { createPinia } from 'pinia'
import type { App } from 'vue'

export const pinia = createPinia()
export function registerStore(app: App<Element>) {
  app.use(pinia)
}
