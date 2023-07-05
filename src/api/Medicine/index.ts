import type {
  REQ_ORDER_PARAMS,
  RES_ADDRESS_DATA,
  RES_MEDICINE_DATA,
  RES_MEDICINE_LST,
  RES_MEDICINE_ORDER_DATA,
  RES_ORDER_DETIAL_DATA
} from '@/types/medicine'
import { request } from '@/utils/request'
interface res {
  data: {
    id: string
  }
}
enum API {
  /** 根据处方ID查询药品预支付信息 */
  GET_MEDICINE_INFO = 'patient/medicine/order/pre',
  /** 获取地址信息 */
  GET_ADDRESS_INFO = 'patient/order/address',
  /** 创建订单 */
  CREAT_ORDER_URL = 'patient/medicine/order',
  /** 查询药品订单详情 */
  GET_MEDICINE_ORDER = 'patient/medicine/order/detail',
  /** 查询订单列表 */
  GET_MEDICINE_ORDER_LIST = 'patient/medicine/order/mylist'
}
export const reqMedicineInfo = <T>(params: { prescriptionId: string }) => {
  return request.get<T, RES_MEDICINE_DATA>(API.GET_MEDICINE_INFO, {
    params
  })
}
export const reqAddress = () => {
  return request.get<any, RES_ADDRESS_DATA>(API.GET_ADDRESS_INFO)
}
export const reqMedicineOrder = <T>(data: {
  id: string
  addressId: string
  couponId?: string
}) => {
  return request.post<T, res>(API.CREAT_ORDER_URL, data)
}
export const reqMedicineOrderDetail = <T>(id: string) =>
  request.get<T, RES_ORDER_DETIAL_DATA>(API.GET_MEDICINE_ORDER + `/${id}`)
export const reqMedicineOrderList = <T>(params: REQ_ORDER_PARAMS) => {
  return request.get<T, RES_MEDICINE_ORDER_DATA>(API.GET_MEDICINE_ORDER_LIST, {
    params: {
      status: params.status,
      current: params.current,
      pageSize: params.pageSize
    }
  })
}
export const reqMedicineOrderLogistics = <T>(id: string) => {
  return request.get<T, RES_MEDICINE_LST>(`patient/order/${id}/logistics`)
}
