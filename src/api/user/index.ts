import type {
  CodeType,
  RES_CODE_DATA,
  RES_PATIENTS_DATA,
  RES_TRUE_USER_DATA,
  RES_USER_DATA
} from '@/types/user'
import { request } from '@/utils/request'
enum API {
  LOGIN_URL = 'login/password',
  GET_CODE = 'code',
  LOGIN_CODE_URL = 'login',
  GET_USER_INFO_URL = 'patient/myUser',
  GET_PATIENTSLIST_URL = 'patient/mylist'
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
