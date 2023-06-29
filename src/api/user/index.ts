import type {
  CodeType,
  PATIENTS_DATA,
  RES_CODE_DATA,
  RES_PATIENTS_DATA,
  RES_TRUE_USER_DATA,
  RES_USER_DATA
} from '@/types/user'
import { request } from '@/utils/request'
enum API {
  // 密码登录
  LOGIN_URL = 'login/password',
  // 验证码获取
  GET_CODE = 'code',
  // 验证码登录
  LOGIN_CODE_URL = 'login',
  // 获取用户信息
  GET_USER_INFO_URL = 'patient/myUser',
  /** 获取患者信息 */
  GET_PATIENTSLIST_URL = 'patient/mylist',
  /** 添加患者 */
  ADD_PATIENTS_URL = 'patient/add',
  /** 修改患者 */
  EDIT_PATIENTS_URL = 'patient/update',
  /** 删除患者 */
  DEL_PATIENTS_URL = 'patient/del'
}
export const reqLogin = <T>(mobile: string, password: string) => {
  return request.post<T, RES_USER_DATA>(API.LOGIN_URL, { mobile, password })
}
export const reqMoblieCode = <T>(mobile: string, type: CodeType) => {
  return request<T, RES_CODE_DATA>(API.GET_CODE, {
    method: 'GET',
    params: {
      mobile,
      type
    }
  })
}
export const reqCodeLogin = <T>(mobile: string, code: string) => {
  return request.post<T, RES_USER_DATA>(API.LOGIN_CODE_URL, { mobile, code })
}
export const reqUserInfo = <T>() => {
  return request.get<T, RES_TRUE_USER_DATA>(API.GET_USER_INFO_URL)
}
export const reqPatientsList = <T>() => {
  return request.get<T, RES_PATIENTS_DATA>(API.GET_PATIENTSLIST_URL)
}
export const reqAddPatients = (patients: PATIENTS_DATA) => {
  return request.post(API.ADD_PATIENTS_URL, patients)
}
export const reqEditPatients = (patients: PATIENTS_DATA) => {
  return request.put(API.EDIT_PATIENTS_URL, patients)
}
export const reqDelPatients = (id: string) => {
  return request.delete(API.DEL_PATIENTS_URL + `/${id}`)
}
