import type { GOLBAL_API_STATUS } from './global-status'
import { ConsultType, IllnessTime } from '@/enum'
import { OrderType } from '@/enum'
export interface RES_HOME_DATA extends GOLBAL_API_STATUS {
  /**
   * 返回数据
   */
  data?: HOME_DATA
}

/**
 * 返回数据
 */
export interface HOME_DATA {
  /**
   * 总页数
   */
  pageTotal: number
  /**
   * 数据
   */
  rows: HOMEINFO_ROW[]
  /**
   * 总条数
   */
  total: number
}
export interface HOMEINFO_ROW {
  /**
   * 收藏数量
   */
  collectionNumber: number | string
  /**
   * 评论数量
   */
  commentNumber: number
  /**
   * 内容详情
   */
  content: string
  /**
   * 封面地址
   */
  coverUrl: CoverUrl[]
  /**
   * 创建人头像
   */
  creatorAvatar: string
  /**
   * 创建人科室
   */
  creatorDep: string
  /**
   * 创建人医院
   */
  creatorHospatalName: string
  /**
   * 创建人id
   */
  creatorId: string
  /**
   * 创建人姓名
   */
  creatorName: string
  /**
   * 创建人职称
   */
  creatorTitles: string
  /**
   * 文章id
   */
  id: string
  /**
   * 是否关注0未关注1关注
   */
  likeFlag: 0 | 1
  /**
   * 文章标题
   */
  title: string
  /**
   * 百科关联的话题
   */
  topics?: string[]
}

export enum CoverUrl {
  HttpsGimg2BaiducomImageSearchSrchttp3A2F2FcsslDuitangcom2Fuploads2Fblog2F2020092F282F2020092809311161FbdThumb1000_0jpegReferhttp3A2F2FcsslDuitangcomApp2002SizeF999910000QA80N0G0NFmtAutosec1659150598TF2Ccb384417E2E60F8631Ec0A58Fc8F4 = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202009%2F28%2F20200928093111_61fbd.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659150598&t=f2ccb384417e2e60f8631ec0a58fc8f4',
  HttpsGimg2BaiducomImageSearchSrchttp3A2F2FcsslDuitangcom2Fuploads2Fitem2F2020032F102F20200310000210RtndkThumb400_0JpgReferhttp3A2F2FcsslDuitangcomApp2002SizeF999910000QA80N0G0NFmtAutosec1659150667T67C57C386635Cba553E68009E02C0222 = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F10%2F20200310000210_rtndk.thumb.400_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659150667&t=67c57c386635cba553e68009e02c0222',
  HttpsImg0BaiducomItU19607714781403941227Fm253FmtAutoApp138FJPEGW400H400 = 'https://img0.baidu.com/it/u=1960771478,1403941227&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400'
}
export interface RES_LIKE_DATA extends GOLBAL_API_STATUS {
  /**
   * 返回数据
   */
  data?: LIKE_DATA
}

/**
 * 关注的返回数据
 */
export interface LIKE_DATA {
  /**
   * 总页数
   */
  pageTotal: number
  /**
   * 数据
   */
  rows: FOLLOW_DOCTOR_DATA[]
  /**
   * 总条数
   */
  total: number
}

export interface FOLLOW_DOCTOR_DATA {
  /**
   * 医生头像
   */
  avatar: string
  consultationNum: number | string
  /**
   * 科室名称
   */
  depName: string
  /**
   * 医院等级-名称简写
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
   * 未登录用户默认返回0，登录用户实际判断是否关注的标志1已关注0未关注
   */
  likeFlag: 0 | 1
  major: string
  /**
   * 医生姓名
   */
  name: string
  /**
   * 职称
   */
  positionalTitles: string
  score: number | string
  /**
   * 接诊费用
   */
  serviceFee: number | string
}
// props类型 recommend推荐，fatReduction减脂，food健康饮食，like关注医生页面文章
export type KnowledgeType = 'like' | 'recommend' | 'fatReduction' | 'food'
export type REQ_KNOWLEDGE_DATA = REQ_DOCTOR_DATA & {
  type: KnowledgeType
}
export type REQ_DOCTOR_DATA = {
  current?: number
  pageSize?: number
}
// 关注的类型，医生|文章|百科话题|疾病
export type FOLLOW_TYPE = 'doc' | 'knowledge' | 'topic' | 'disease'
// 图片列表
export type Image = {
  /** 图片ID */
  id: string
  /** 图片地址 */
  url: string
}
export interface RES_IMG_DATA extends GOLBAL_API_STATUS {
  data: Image
}
// 问诊记录
export type Consult = {
  /** 问诊记录ID */
  id: string
  /** 问诊类型 */
  type: ConsultType
  /** 快速问诊类型，0 普通 1 三甲 */
  illnessType: 0 | 1
  /** 科室ID */
  depId: string
  /** 疾病描述 */
  illnessDesc: string
  /** 疾病持续时间 */
  illnessTime: IllnessTime
  /** 是否就诊过，0 未就诊过  1 就诊过 */
  consultFlag: 0 | 1
  /** 图片数组 */
  pictures: Image[]
  /** 患者ID */
  patientId: string
  /** 优惠券ID */
  couponId: string
}

// 问诊记录-全部可选
export type PartialConsult = Partial<Consult>
// Required 转换为全部必须   Partial 转换问全部可选  两个内置的泛型类型
// 科室
export type SubDep = {
  /** 科室ID */
  id: string
  /** 科室名称 */
  name: string
}

export type TopDep = SubDep & {
  /** 二级科室数组 */
  child: SubDep[]
}
export interface RES_DEP_DATA extends GOLBAL_API_STATUS {
  data: TopDep[]
}
// 准备表单数据
export type ConsultIllness = Pick<
  PartialConsult,
  'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'
>
//  订单预支付信息
// 调接口需要传入的参数
export type ConsultOrderPreParams = Pick<PartialConsult, 'type' | 'illnessType'>

// 问诊订单预支付信息
export type ConsultOrderPreData = {
  /** 积分抵扣 */
  pointDeduction: number
  /** 优惠券抵扣 */
  couponDeduction: number
  /** 优惠券ID */
  couponId: string
  /** 需付款 */
  payment: number
  /** 实付款 */
  actualPayment: number
}
export interface RES_ORDER_INFO_DATA extends GOLBAL_API_STATUS {
  data: ConsultOrderPreData
}

export interface RES_GENERATE_ORDER_DATA extends GOLBAL_API_STATUS {
  data: { id: string }
}
export type REQ_PAY_DATA = {
  /**
   * 订单id
   */
  orderId: string
  /**
   * 上课自测时，传值：http://localhost:端口号/+回调页面，
   * vue版本测试环境，传值：http://测试环境域名/+回调页面，
   * 用于决定付款成功后，回调地址是本地还是测试环境地址
   */
  payCallback?: string
  /**
   * 支付方式0微信支付，1支付宝2云闪付
   */
  paymentMethod?: 0 | 1 | 2
}
export type PAY_DATA = {
  payUrl: string
}
export interface RES_PAY_DATA extends GOLBAL_API_STATUS {
  data: PAY_DATA
}
// 问诊订单单项信息
export type ConsultOrderItem = Consult & {
  /** 创建时间 */
  createTime: string
  /** 医生信息 */
  docInfo?: FOLLOW_DOCTOR_DATA
  /** 患者信息 */
  patientInfo: Patient
  /** 订单编号 */
  orderNo: string
  /** 订单状态 */
  status: OrderType
  /** 状态文字 */
  statusValue: string
  /** 类型问诊文字 */
  typeValue: string
  /** 倒计时时间 */
  countdown: number
  /** 处方ID */
  prescriptionId?: string
  /** 评价ID */
  evaluateId: number
  /** 应付款 */
  payment: number
  /** 优惠券抵扣 */
  couponDeduction: number
  /** 积分抵扣 */
  pointDeduction: number
  /** 实付款 */
  actualPayment: number
}
/** 获取聊天室状态的类型 */
export interface RES_CONSULT_STATUS extends GOLBAL_API_STATUS {
  data: ConsultOrderItem
}
/** 获取处方图片的类型 */
export interface RES_PRECRIPTION_DATA extends GOLBAL_API_STATUS {
  data: {
    url: string
  }
}
// 定义获取订单列表的接口参数类型
export type ConsultOrderListParams = REQ_DOCTOR_DATA & {
  /** 问诊记录类型 */
  type: ConsultType
}
export type ConsultOrderPage = {
  pageTotal: number
  total: number
  rows: ConsultOrderItem[]
}
// 定义获取订单列表的返回参数类型
export interface RES_CONSULT_LIST extends GOLBAL_API_STATUS {
  data: ConsultOrderPage
}
