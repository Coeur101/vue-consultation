import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import useUserStore from '@/stores/modules/user'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const router = createRouter({
  // 默认为/,相当与vue2中baseUrl
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
// 配置全局路由守卫
router.beforeEach((to) => {
  NProgress.start()
  // 用户仓库
  const store = useUserStore()
  // 不需要登录的页面，白名单
  const wihteList = ['/login', '/other']
  // 如果没有登录且不在白名单内，去登录
  if (!store.user?.token && !wihteList.includes(to.path)) return '/login'
  // 否则不做任何处理
})
router.afterEach((to) => {
  document.title = `${to.meta.title || ''}-医疗问诊`
  NProgress.done()
})
export default router
