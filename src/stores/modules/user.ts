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
  }
})
export default useUserStore
