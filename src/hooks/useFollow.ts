import { reqFollow } from '@/api/consult'
import type { FOLLOW_TYPE } from '@/types/consult'

// 抽离关注需求的业务代码
export const useFollow = (type: FOLLOW_TYPE = 'doc') => {
  const loading = ref(false)
  async function follow(item: any) {
    loading.value = true
    try {
      // 关注医生
      await reqFollow(item.id, type)
      // 成功后likeFlag为1
      item.likeFlag = item.likeFlag === 1 ? 0 : 1
    } finally {
      loading.value = false
    }
  }
  return {
    follow,
    loading
  }
}
