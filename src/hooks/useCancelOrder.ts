// 抽取取消订单代码
import { reqCancelOrder } from '@/api/consult'
import { OrderType } from '@/enum'
import type { ConsultOrderItem } from '@/types/consult'
import type { MedicineInfo, OrderDetail } from '@/types/medicine'
import { showFailToast, showSuccessToast } from 'vant'

export const useCancelOrder = (cb?: () => void) => {
  const loading = ref(false)
  const handleCancelOrder = async (
    item: ConsultOrderItem | MedicineInfo | OrderDetail
  ) => {
    loading.value = true
    try {
      loading.value = true
      await reqCancelOrder(item.id)
      showSuccessToast('取消成功')
      item.status = OrderType.ConsultCancel
      item.statusValue = '已取消'
      cb && cb()
    } catch (error) {
      showFailToast('取消失败')
    } finally {
      loading.value = false
    }
  }
  return { handleCancelOrder, loading }
}
