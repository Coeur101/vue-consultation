import type {
  REQ_DOCTOR_DATA,
  REQ_KNOWLEDGE_DATA,
  RES_HOME_DATA,
  RES_LIKE_DATA,
  FOLLOW_TYPE,
  RES_DEP_DATA,
  RES_IMG_DATA
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
  UPDATE_DISEASE_URL = 'upload'
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
