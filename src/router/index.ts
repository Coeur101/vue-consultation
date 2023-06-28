import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
const router = createRouter({
  // 默认为/,相当与vue2中baseUrl
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
