import type { IllnessTime } from '@/enum'
import { flagOptions, timeOptions } from '@/services/constants'

// 取出就诊时间
export const getIllnessTimeText = (time: IllnessTime) =>
  timeOptions.find((item) => item.value === time)?.text
// 取出是否在医院就诊过
export const getConsultFlagText = (flag: 0 | 1) =>
  flagOptions.find((item) => item.value === flag)?.text
