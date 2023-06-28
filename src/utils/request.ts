import axios, { type InternalAxiosRequestConfig } from 'axios'
import useUserStore from '@/stores/modules/user'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()
const baseURL = 'https://consult-api.itheima.net/'
const request = axios.create({
  baseURL,
  timeout: 1000 * 10
})
// 设置请求拦截器，携带Token
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStore()
    config.headers.Authorization = `Bearer ${userStore.user.token}`
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
// 设置响应拦截器
request.interceptors.response.use(
  (res) => {
    // 返回正常的为1000其余为错误
    if (res.data.code !== 10000) {
      showToast({
        type: 'fail',
        message: res.data.message
      })
      return Promise.reject(new Error(res.data.message))
    }
    return res.data
  },
  (err) => {
    // 判断用户token是否失效
    if (err.response.status === 401) {
      // 删除用户信息
      const userStore = useUserStore()
      userStore.delUser()
      showToast({
        type: 'fail',
        message: 'token失效'
      })
      // 跳转登录，返回接口失效的所在的页面地址
      router.push(`/login?returnUrl=${router.currentRoute.value.fullPath}`)
    }
  }
)
export { request, baseURL }
