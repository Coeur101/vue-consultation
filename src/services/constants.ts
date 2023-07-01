import { IllnessTime } from '@/enum'

export const timeOptions = [
  { text: '一周内', value: IllnessTime.Week },
  { text: '一月内', value: IllnessTime.Month },
  { text: '半年内', value: IllnessTime.HalfYear },
  { text: '大于半年', value: IllnessTime.More }
]
export const flagOptions = [
  { text: '就诊过', value: 0 },
  { text: '没就诊过', value: 1 }
]
