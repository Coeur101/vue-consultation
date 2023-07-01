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
      {
        path: '/home',
        component: () => import('@/views/Home/index.vue'),
        meta: { title: '首页' }
      },
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
    component: () => import('@/views/User/c-cnps/PatientPage.vue'),
    meta: { title: '家庭档案' }
  },
  {
    path: '/consult/fast',
    component: () => import('@/views/Consult/index.vue'),
    meta: {
      title: '极速问诊'
    }
  },
  {
    path: '/consult/dep',
    component: () => import('@/views/Consult/c-cnps/consultDep.vue'),
    meta: {
      title: '选择科室'
    }
  },

  {
    path: '/consult/illness',
    component: () => import('@/views/Consult/c-cnps/consultIllness.vue'),
    meta: { title: '病情描述' }
  },
  {
    path: '/consult/pay',
    component: () => import('@/views/Consult/c-cnps/consultPay.vue'),
    meta: { title: '问诊支付' }
  }
]
export default routes
