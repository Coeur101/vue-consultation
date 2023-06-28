import type { USER_DATA } from '@/types/user'
import { defineStore } from 'pinia'

/**
 * 存储用户相关的数据
 */
interface stateData {
  user: USER_DATA
}
const useUserStore = defineStore('userStore', {
  state: () =>
    <stateData>{
      user: {}
    },
  actions: {
    setUser(userData: USER_DATA) {
      this.user = userData
    },
    delUser() {
      this.user = {} as USER_DATA
    }
  },
  // 开启数据持久化
  // 自定义存储指定的数据，key值
  persist: {
    // 存储指定的变量
    paths: ['user']
  }
})
export default useUserStore
