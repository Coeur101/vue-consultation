import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/',
    component: () => import('@/views/Layout/index.vue'),

    redirect: '/home',
    children: [
      { path: '/home', component: () => import('@/views/Home/index.vue'), meta: { title: '首页' } },
      {
        path: '/article',
        component: () => import('@/views/Article/index.vue'),
        meta: { title: '健康百科' }
      },
      {
        path: '/notify',
        component: () => import('@/views/Notify/index.vue'),
        meta: { title: '消息通知' }
      },
      {
        path: '/user',
        component: () => import('@/views/User/index.vue'),
        meta: { title: '个人中心' }
      }
    ]
  },
  {
    path: '/user/patient',
    component: () => import('@/views/User/PatientPage.vue'),
    meta: { title: '家庭档案' }
  }
]
export default routes
