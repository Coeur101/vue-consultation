<script setup lang="ts">
import type { PATIENTS_DATA } from '@/types/user'
import { patientsNameRules, patientsIDCardRules } from '@/utils/rules'
import { reqAddPatients, reqPatientsList, reqEditPatients, reqDelPatients } from '@/api/user'
import { showConfirmDialog, type FormInstance, showSuccessToast } from 'vant'
// 控制新增患者弹出层
const show = ref(false)
const options = [
  {
    text: '男',
    value: 1
  },
  {
    text: '女',
    value: 0
  }
]
const initPatient: PATIENTS_DATA = {
  name: '',
  idCard: '',
  gender: 1,
  defaultFlag: 0
}
const patient = ref<PATIENTS_DATA>({ ...initPatient })
type list = PATIENTS_DATA[]
const form = ref<FormInstance>()
const patientList = ref<list>([])
const handleAddPatient = () => {
  show.value = true
}
const handleClosePopup = () => {
  patient.value = { ...initPatient }
  show.value = false
}
const defaultFlag = computed({
  get() {
    return patient.value.defaultFlag === 1 ? true : false
  },
  set(value) {
    patient.value.defaultFlag = value ? 1 : 0
  }
})
const handleSavePatient = async () => {
  await form.value?.validate()
  // 校验通过，执行保存
  // 身份证倒数第二位，单数是男，双数是女
  const gender = +patient.value.idCard.slice(-2, -1) % 2
  if (gender !== patient.value.gender) {
    await showConfirmDialog({
      title: '温馨提示',
      message: '填写的性别和身份证号中的不一致\n您确认提交吗？'
    })
  }
  patient.value.id ? await reqEditPatients(patient.value) : await reqAddPatients(patient.value)
  show.value = false
  loadPatientList()
  showSuccessToast(patient.value.id ? '编辑成功' : '添加成功')
}
const handleEditPatient = (data: PATIENTS_DATA) => {
  show.value = true
  for (const key in patient.value) {
    ;(patient.value as any)[key] = (data as any)[key]
    patient.value.id = data.id
  }
}
const handleDelPatients = async () => {
  await showConfirmDialog({
    title: '温馨提示',
    message: `您确认要删除 ${patient.value.name} 患者信息吗 ？`
  })
  await reqDelPatients(patient.value.id as string)
  showSuccessToast('删除成功')
  show.value = false
  loadPatientList()
}
const loadPatientList = async () => {
  try {
    const result = await reqPatientsList()
    patientList.value = result.data as list
  } catch (error) {}
}
onMounted(() => {
  loadPatientList()
})
</script>

<template>
  <div class="patient-page">
    <cp-nav-bar title="家庭档案"></cp-nav-bar>
    <div class="patient-list">
      <div class="patient-item" v-for="item in patientList" :key="item.id">
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <!-- 身份证脱敏处理 -->
          <span class="id">{{ item.idCard.replace(/^(.{6}).+(.{4})$/, '\$1********\$2') }}</span>
          <span>{{ item.gender ? '男' : '女' }}</span>
          <span>{{ item.age + '岁' }}</span>
        </div>
        <div class="icon" @click="handleEditPatient(item)"><cp-icon name="user-edit" /></div>
        <div class="tag" v-if="item.defaultFlag">默认</div>
      </div>
      <div class="patient-add" v-if="patientList.length < 6" @click="handleAddPatient">
        <cp-icon name="user-add" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 人</div>
    </div>
    <!-- 新增患者 -->
    <van-popup v-model:show="show" position="bottom">
      <cp-nav-bar
        :title="patient.id ? '编辑患者' : '添加患者'"
        :back="handleClosePopup"
        right_title="保存"
        @click_right="handleSavePatient"
      ></cp-nav-bar>
      <van-form autocomplete="off" ref="form">
        <van-field
          v-model="patient.name"
          :ruls="patientsNameRules"
          label="真实姓名"
          placeholder="请输入真实姓名"
        />
        <van-field
          v-model="patient.idCard"
          :rules="patientsIDCardRules"
          label="身份证号"
          placeholder="请输入身份证号"
        />
        <van-field label="性别" class="pb4">
          <!-- 单选按钮组件 -->
          <template #input>
            <cp-radio-btn v-model="patient.gender" :options="options"></cp-radio-btn>
          </template>
        </van-field>
        <van-field label="默认就诊人">
          <template #input>
            <van-checkbox v-model="defaultFlag" :icon-size="18" round />
          </template>
        </van-field>
        <van-action-bar v-if="patient.id">
          <van-action-bar-button @click="handleDelPatients">删除</van-action-bar-button>
        </van-action-bar>
      </van-form>
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.patient-page {
  padding: 46px 0 80px;
  ::v-deep .van-popup {
    width: 100%;
    height: 100%;
    padding-top: 46px;
  }
}
.van-action-bar {
  padding: 0 10px;
  margin-bottom: 10px;
  .van-button {
    color: var(--cp-price);
    background-color: var(--cp-bg);
  }
}

.patient-list {
  padding: 15px;
}
.patient-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: var(--cp-bg);
  border-radius: 8px;
  margin-bottom: 15px;
  position: relative;
  border: 1px solid var(--cp-bg);
  transition: all 0.3s;
  overflow: hidden;
  .info {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    span {
      color: var(--cp-tip);
      margin-right: 20px;
      line-height: 30px;
      &.name {
        font-size: 16px;
        color: var(--cp-text1);
        width: 80px;
        margin-right: 0;
      }
      &.id {
        color: var(--cp-text2);
        width: 180px;
      }
    }
  }
  .icon {
    color: var(--cp-tag);
    width: 20px;
    text-align: center;
  }
  .tag {
    position: absolute;
    right: 60px;
    top: 21px;
    width: 30px;
    height: 16px;
    font-size: 10px;
    color: #fff;
    background-color: var(--cp-primary);
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.selected {
    border-color: var(--cp-primary);
    background-color: var(--cp-plain);
    .icon {
      color: var(--cp-primary);
    }
  }
}
.patient-add {
  background-color: var(--cp-bg);
  color: var(--cp-primary);
  text-align: center;
  padding: 15px 0;
  border-radius: 8px;
  .cp-icon {
    font-size: 24px;
  }
}
.patient-tip {
  color: var(--cp-tag);
  padding: 12px 0;
}
.pb4 {
  padding-bottom: 4px;
}
</style>
