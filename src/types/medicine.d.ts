import type { OrderType } from '@/enum'
import type { GOLBAL_API_STATUS } from './global-status'
import type { Medical } from './room'

export type OrderPre = {
  /** 处方ID */
  id: string
  /** 优惠券ID */
  couponId: string
  /** 积分抵扣 */
  pointDeduction: number
  /** 优惠券抵扣 */
  couponDeduction: number
  /** 应付款 */
  payment: number
  /** 邮费 */
  expressFee: number
  /** 实付款 */
  actualPayment: number
  /** 药品订单 */
  medicines: Medical[]
}
export interface RES_MEDICINE_DATA extends GOLBAL_API_STATUS {
  data: OrderPre
}
export type AddressItem = {
  /** 地址ID */
  id: string
  /** 联系方式 */
  mobile: string
  /** 收件人 */
  receiver: string
  /** 省 */
  province: string
  /** 市 */
  city: string
  /** 区 */
  county: string
  /** 详细地址 */
  addressDetail: string
  /** 是否默认地址，0 不是 1 是 */
  isDefault: 0 | 1
}
export interface RES_ADDRESS_DATA extends GOLBAL_API_STATUS {
  data: AddressItem[]
}
type Address = Omit<AddressItem, 'isDefault'>
export type OrderDetail = {
  /** 药品订单ID */
  id: string
  /** 药品订单编号 */
  orderNo: string
  /** 订单类型 */
  type: number
  /** 创建时间 */
  createTime: string
  /** 处方ID */
  prescriptionId: string
  /** 订单状态 */
  status: OrderType
  /** 订单状态说明 */
  statusValue: string
  /** 药品清单 */
  medicines: Medical[]
  /** 支付倒计时时间 */
  countDown: number
  /** 收货地址 */
  addressInfo: Address
  /** 物流信息 */
  expressInfo: {
    /** 物流最新位置 */
    content: string
    /** 物流最新时间 */
    time: string
  }
  /** 支付时间 */
  payTime: string
  /** 支付方式 */
  paymentMethod?: 0 | 1
  /** 支付金额 */
  payment: number
  /** 积分抵扣 */
  pointDeduction: number
  /** 优惠券抵扣 */
  couponDeduction: number
  /** 邮费 */
  expressFee: number
  /** 实付金额 */
  actualPayment: number
  /** 问诊室ID */
  roomId: string
}
export interface RES_ORDER_DETIAL_DATA extends GOLBAL_API_STATUS {
  data: OrderDetail
}
/**
 * empty object
 */
export interface RES_MEDICINE_ORDER_DATA extends GOLBAL_API_STATUS {
  data: REQ_ORDER_DATA
}

export interface ORDER_DATA {
  pageTotal: number
  rows: MedicineInfo[]
  total: number
}
export interface REQ_ORDER_PARAMS {
  /**
   * 当前页，默认是1
   */
  current: number
  /**
   * 每页大写默认是10
   */
  pageSize: number
  /**
   * 药品订单的状态'10': '待支付',   '11': '待发货',   '12': '待收货',   '14': '已取消',   '13': '已完成',
   */
  status: OrderType
}

/**
 * 评价数据
 */
export interface MedicineInfo {
  /**
   * 实际支付
   */
  actualPayment: number
  /**
   * 订单地址信息
   */
  address?: Address
  /**
   * 优惠券抵扣，不使用优惠券为0
   */
  couponDeduction: number
  /**
   * 使用的优惠券id
   */
  couponId?: string
  /**
   * 运费
   */
  expressFee: number
  /**
   * 订单id
   */
  id: string
  /**
   * 药品信息
   */
  medicines: Medical[]
  /**
   * 订单编号
   */
  orderNo: string
  /**
   * 药品金额
   */
  payment: number
  /**
   * 支付方式0微信支付，1支付宝2云闪付
   */
  paymentMethod?: string
  /**
   * 药品订单状态：'10': '待支付',   '11': '待发货',   '12': '待收货',  '13': '已完成', '14': '已取消',
   */
  status: OrderType
  /**
   * 药品订单状态：'10': '待支付',   '11': '待发货',   '12': '待收货',  '13': '已完成', '14': '已取消',
   */
  statusValue: string
}

/**
 * 订单地址信息
 */
export interface Address {
  /**
   * 收货人
   */
  receiver?: string
  /**
   * 收货人省份+市
   */
  receiverAddress?: string
  /**
   * 收货人详细地址
   */
  receiverAddressDetail?: string
  /**
   * 收货人手机号
   */
  receiverMobile?: string
}
export type Express = {
  /** 物流信息ID */
  id: string
  /** 物流内容 */
  content: string
  /** 创建时间 */
  createTime: string
  /** 物流状态 */
  status: ExpressStatus
  /** 状态文章 */
  statusValue: string
}

export type Location = {
  /** 经度 */
  longitude: string
  /** 纬度 */
  latitude: string
}

export type Logistics = {
  /** 预计送达时间 */
  estimatedTime: string
  /** 物流公司名称 */
  name: string
  /** 物流编号 */
  awbNo: string
  /** 最新物流状态 */
  status: ExpressStatus
  /** 最新物流状态文字 */
  statusValue: string
  /** 物流信息数组 */
  list: Express[]
  /** 轨迹信息数组 */
  logisticsInfo: Location[]
  /** 当前运输位置 */
  currentLocationInfo: Location
}
//获取药品订单物流信息
interface RES_MEDICINE_LST extends GOLBAL_API_STATUS {
  data: Logistics
}
