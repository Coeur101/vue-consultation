import { reqPrescription } from '@/api/consult'
import { showImagePreview } from 'vant'

// 提取查看原始处方的代码
export const useShowPrescription = () => {
  // 获取原始处方图片
  const onShowPrescription = async (id?: string) => {
    if (id) {
      const res = await reqPrescription(id)
      showImagePreview([res.data.url])
    }
  }
  return { onShowPrescription }
}
