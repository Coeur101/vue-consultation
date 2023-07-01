import type { ConsultType } from '@/enum'
import type { PartialConsult } from '@/types/consult'
import type { PATIENTS_DATA } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConsultStore = defineStore(
  'cp-consult',
  () => {
    const consult = ref<PartialConsult>({})
    const patient = ref<PATIENTS_DATA>()
    // 设置问诊类型
    const setType = (type: ConsultType) => (consult.value.type = type)
    // 设置极速问诊类型
    const setIllnessType = (type: 0 | 1) => (consult.value.illnessType = type)
    // 设置科室
    const setDep = (id: string) => (consult.value.depId = id)
    // 设置病情描述
    const setIllness = (
      illness: Pick<
        PartialConsult,
        'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'
      >
    ) => {
      consult.value.illnessDesc = illness.illnessDesc
      consult.value.illnessTime = illness.illnessTime
      consult.value.consultFlag = illness.consultFlag
      consult.value.pictures = illness.pictures
    }
    // 设置患者
    const setPatientId = (id: string) => (consult.value.patientId = id)
    const setPatient = (item: PATIENTS_DATA) => (patient.value = item)
    // 设置优惠券
    const setCoupon = (id?: string) => (consult.value.couponId = id)
    // 清空记录
    const clear = () => (consult.value = {})
    return {
      consult,
      patient,
      setType,
      setIllnessType,
      setDep,
      setIllness,
      setPatient,
      setCoupon,
      setPatientId,
      clear
    }
  },
  {
    persist: true
  }
)
