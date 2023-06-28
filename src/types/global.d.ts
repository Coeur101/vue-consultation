/**
 * empty object
 */
export interface GOLBAL_API_STATUS {
  /**
   * 正常返回10000，其他表示错误
   */
  code: number
  /**
   * 接口信息
   */
  message: string
  status?: boolean
}
