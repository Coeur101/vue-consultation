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
export type CodeType = 'login' | 'register' | 'changeMobile' | 'forgetPassword' | 'bindMobile'
export interface CODE_DATA {
  /**
   * 手机验证码
   */
  code: string
}
export interface RES_CODE_DATA extends GOLBAL_API_STATUS {
  data: CODE_DATA
}

/**
 * 问诊中信息
 */
export interface CONSULTATION_INFO {
  /**
   * 医生头像
   */
  avatar: string
  /**
   * 科室
   */
  depName: string
  /**
   * 医院等级
   */
  gradeName: string
  /**
   * 医院名称
   */
  hospitalName: string
  /**
   * 医生id
   */
  id: string
  /**
   * 医生姓名
   */
  name: string
  /**
   * 订单id
   */
  orderId: string
  /**
   * 职称
   */
  positionalTitles: string
}

export interface ORDER_INFO {
  /**
   * 已完成
   */
  finishedNumber: number
  /**
   * 待付款
   */
  paidNumber: number
  /**
   * 待发货
   */
  receivedNumber: number
  /**
   * 待收货
   */
  shippedNumber: number
}
/**
 * empty object
 */
export type TRUE_USER_DATA = Omit<USER_DATA, 'token'> & {
  orderInfo: ORDER_INFO
  consultationInfo: CONSULTATION_INFO[]
  /** 关注 */
  likeNumber: number
  /** 收藏 */
  collectionNumber: number
  /** 积分 */
  score: number
  /** 优惠券 */
  couponNumber: number
}

export interface RES_TRUE_USER_DATA extends GOLBAL_API_STATUS {
  data: TRUE_USER_DATA
}
// 获取患者列表
export interface RES_PATIENTS_DATA extends GOLBAL_API_STATUS {
  data?: PATIENTS_DATA[]
}

export interface PATIENTS_DATA {
  /**
   * 年龄
   */
  age?: number
  /**
   * 是否设置为默认患者 0不是默认 1是默认患者
   */
  defaultFlag: 0 | 1
  /**
   * 性别 1男 0女
   */
  gender?: 0 | 1
  /**
   * 性别值
   */
  genderValue?: string
  id?: string | number
  /**
   * 患者身份证号
   */
  idCard: string
  /**
   * 患者姓名
   */
  name: string
}
