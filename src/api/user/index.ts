import type { CodeType, RES_CODE_DATA, RES_USER_DATA } from '@/types/user'
import { request } from '@/utils/request'
enum API {
  LOGIN_URL = 'login/password',
  GET_CODE = 'code',
  LOGIN_CODE_URL = 'login'
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
