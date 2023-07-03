import type {
  REQ_DOCTOR_DATA,
  REQ_KNOWLEDGE_DATA,
  RES_HOME_DATA,
  RES_LIKE_DATA,
  FOLLOW_TYPE,
  RES_DEP_DATA,
  RES_IMG_DATA,
  ConsultOrderPreParams,
  RES_ORDER_INFO_DATA,
  PartialConsult,
  RES_GENERATE_ORDER_DATA,
  REQ_PAY_DATA,
  RES_PAY_DATA,
  RES_CONSULT_STATUS,
  RES_PRECRIPTION_DATA,
  ConsultOrderListParams,
  RES_CONSULT_LIST
} from '@/types/consult'
import { request } from '@/utils/request'
enum API {
  /** 获取首页的各个模块的信息 */
  GET_KNOWLEDGE_URL = 'patient/home/knowledge',
  /** 获取推荐关注的医生 */
  GET_FOLLOWDOCTOR_URL = 'home/page/doc',
  /** 关注接口 */
  FOLLOW_URL = 'like',
  /** 获取所有科室 */
  GET_DEP_URL = 'dep/all',
  /** 上传患者图片 */
  UPDATE_DISEASE_URL = 'upload',
  /** 获取预订单支付信息 */
  GET_ORDER_URL = 'patient/consult/order/pre',
  /** 生成订单 */
  GENERATE_ORDER_URL = 'patient/consult/order',
  /** 订单支付接口 */
  PAY_URL = 'patient/consult/pay',
  /** 获取接诊状态 */
  GET_CONSULT_STATUS = 'patient/consult/order/detail',
  /** 获取处方 */
  GET_PRESCRIPTION_URL = 'patient/consult/prescription',
  /** 医生评价 */
  DOCTOR_EVALUATE = 'patient/order/evaluate',
  /** 获取订单列表 */
  GET_CONSULT_ORDER_LIST = 'patient/consult/order/list',
  /** 取消订单 */
  CANCEL_ORDER = 'patient/order/cancel',
  /** 删除订单 */
  DEL_ORDER_URL = 'patient/order',
  /** 查询订单详情信息 */
  GET_ORDER_INFO = 'patient/consult/order/detail'
}
export const reqKnwledge = <T>(knowledgeParams: REQ_KNOWLEDGE_DATA) => {
  return request.get<T, RES_HOME_DATA>(API.GET_KNOWLEDGE_URL, {
    params: {
      ...knowledgeParams
    }
  })
}
export const reqFollowDoctor = <T>(followDoctor: REQ_DOCTOR_DATA) => {
  return request.get<T, RES_LIKE_DATA>(API.GET_FOLLOWDOCTOR_URL, {
    params: {
      ...followDoctor
    }
  })
}
export const reqFollow = <T>(id: string | number, type: FOLLOW_TYPE) => {
  return request.post<T, any>(API.FOLLOW_URL, { id, type })
}
export const reqDepALl = <T>() => {
  return request.get<T, RES_DEP_DATA>(API.GET_DEP_URL)
}
export const reqImg = <T>(file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return request.post<T, RES_IMG_DATA>(API.UPDATE_DISEASE_URL, formData)
}
export const reqOrderInfo = <T>(params: ConsultOrderPreParams) => {
  return request.get<T, RES_ORDER_INFO_DATA>(API.GET_ORDER_URL, {
    params: {
      ...params
    }
  })
}
// 生成订单接口
export const reqOrder = <T>(data: PartialConsult) => {
  return request.post<T, RES_GENERATE_ORDER_DATA>(API.GENERATE_ORDER_URL, data)
}
export const reqPay = <T>(data: REQ_PAY_DATA) => {
  return request.post<T, RES_PAY_DATA>(API.PAY_URL, data)
}
export const reqConsultStatus = <T>(orderId: string) => {
  return request.get<T, RES_CONSULT_STATUS>(API.GET_CONSULT_STATUS, {
    params: {
      orderId
    }
  })
}
export const reqPrescription = <T>(id: string) => {
  return request.get<T, RES_PRECRIPTION_DATA>(
    API.GET_PRESCRIPTION_URL + `/${id}`
  )
}
export const reqEvaluateConsultOrder = <T>(data: {
  docId: string
  orderId: string
  score: number
  content: string
  anonymousFlag: 0 | 1
}) => request.post<T, any>(API.DOCTOR_EVALUATE, data)
export const reqOrderList = <T>(params: ConsultOrderListParams) => {
  return request.get<T, RES_CONSULT_LIST>(API.GET_CONSULT_ORDER_LIST, {
    params
  })
}
export const reqCancelOrder = <T>(id: string) => {
  return request.put<T, any>(API.CANCEL_ORDER + `/${id}`)
}
export const reqDelOrder = <T>(id: string) => {
  return request.delete<T, any>(API.DEL_ORDER_URL + `/${id}`)
}
export const reqAllOrderInfo = <T>(id: string) => {
  return request.get<T, RES_CONSULT_STATUS>(API.GET_ORDER_INFO, {
    params: {
      orderId: id
    }
  })
}
