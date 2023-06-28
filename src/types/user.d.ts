import { GOLBAL_API_STATUS } from './global'
export interface USER_DATA {
  /**
   * 用户名
   */
  account?: string
  /**
   * 头像
   */
  avatar?: string
  /**
   * 用户id
   */
  id?: string
  /**
   * 脱敏手机号，带星号的手机号
   */
  mobile?: string
  /**
   * refreshToken
   */
  refreshToken: string
  /**
   * token
   */
  token: string
}
export interface RES_USER_DATA extends GOLBAL_API_STATUS {
  data: USER_DATA
}
