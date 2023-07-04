import { reqDelOrder } from '@/api/consult'
import type { ConsultOrderItem } from '@/types/consult'
import type { MedicineInfo, OrderDetail } from '@/types/medicine'
import { showFailToast, showSuccessToast } from 'vant'

// 抽取删除订单代码
export const useDelOrder = (cb: () => void) => {
  // 删除订单
  const deleteLoading = ref(false)

  const handleDelOrder = async (
    item: ConsultOrderItem | MedicineInfo | OrderDetail
  ) => {
    try {
      deleteLoading.value = true
      await reqDelOrder(item.id)
      showSuccessToast('删除成功')
      // 有其他业务则做其他业务
      cb && cb()
    } catch (error) {
      showFailToast('删除失败')
    } finally {
      deleteLoading.value = false
    }
  }
  return {
    handleDelOrder,
    deleteLoading
  }
}
