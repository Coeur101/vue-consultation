<!-- 消息卡片组件，根据消息类型判断显示不同消息卡片 -->
<script setup lang="ts">
import { IllnessTime } from '@/enum'
import { flagOptions, timeOptions } from '@/services/constants'
import { type FOLLOW_DOCTOR_DATA, type Image } from '@/types/consult'
import EvaluateCard from './evaluate-card.vue'
import dayjs from 'dayjs'
const formatTime = (time: string) => dayjs(time).format('HH:mm:ss')

import type { Message } from '@/types/room'
import { MsgType } from '@/enum'
import { showImagePreview } from 'vant'
import useUserStore from '@/stores/modules/user'
import { reqPrescription } from '@/api/consult'
const userStore = useUserStore()
defineProps<{ list: Message[]; docInfo: FOLLOW_DOCTOR_DATA }>()
// 取出就诊时间
const getIllnessTimeText = (time: IllnessTime) =>
  timeOptions.find((item) => item.value === time)?.text
// 取出是否在医院就诊过
const getConsultFlagText = (flag: 0 | 1) =>
  flagOptions.find((item) => item.value === flag)?.text
const previewImg = (pictures?: Image[]) => {
  if (pictures && pictures.length)
    showImagePreview(pictures?.map((item) => item.url))
}
// 获取原始处方图片
const showPrescription = async (id?: string) => {
  if (id) {
    const res = await reqPrescription(id)
    showImagePreview([res.data.url])
  }
}
</script>

<template>
  <template v-for="{ msgType, msg, from, createTime } in list" :key="msg.id">
    <!-- 病情描述 -->
    <div class="msg msg-illness" v-if="msgType === MsgType.CardPat">
      <div class="patient van-hairline--bottom" v-if="msg.consultRecord">
        <p>
          {{ msg.consultRecord.patientInfo.name }}
          {{ msg.consultRecord.patientInfo.genderValue }}
          {{ msg.consultRecord.patientInfo.age }}岁
        </p>
        <p>
          {{ getIllnessTimeText(msg.consultRecord.illnessTime) }} |
          {{ getConsultFlagText(msg.consultRecord.consultFlag) }}
        </p>
      </div>
      <van-row>
        <van-col span="6">病情描述</van-col>
        <van-col span="18">{{ msg.consultRecord?.illnessDesc }}</van-col>
        <template v-if="msg.consultRecord?.pictures.length">
          <van-col span="6">图片</van-col>
          <van-col span="18" @click="previewImg(msg.consultRecord?.pictures)">
            点击查看
          </van-col>
        </template>
      </van-row>
    </div>
    <!-- 温馨提示 -->
    <div class="msg msg-tip" v-if="msgType === MsgType.NotifyTip">
      <div class="content">
        <span class="green">温馨提示：</span>
        <span>{{ msg.content }}</span>
      </div>
    </div>
    <!-- 通用通知 -->
    <div class="msg msg-tip" v-if="msgType === MsgType.Notify">
      <div class="content">
        <span>{{ msg.content }}</span>
      </div>
    </div>
    <!-- 通知-结束 -->
    <div
      class="msg msg-tip msg-tip-cancel"
      v-if="msgType === MsgType.NotifyCancel"
    >
      <div class="content">
        <span>{{ msg.content }}</span>
      </div>
    </div>
    <!-- 发送文字 -->
    <div
      class="msg msg-to"
      v-if="msgType === MsgType.MsgText && userStore.user?.id === from"
    >
      <div class="content">
        <div class="time">{{ formatTime(createTime) }}</div>
        <div class="pao">{{ msg.content }}</div>
      </div>
      <van-image :src="userStore.user?.avatar" />
    </div>
    <!-- 发送图片 -->
    <div
      class="msg msg-to"
      v-if="msgType === MsgType.MsgImage && userStore.user?.id === from"
    >
      <div class="content">
        <div class="time">{{ formatTime(createTime) }}</div>
        <van-image fit="contain" :src="msg.picture?.url" />
      </div>
      <van-image :src="userStore.user?.avatar" />
    </div>
    <!-- 接收图片 -->
    <div
      class="msg msg-from"
      v-if="msgType === MsgType.MsgImage && userStore.user?.id !== from"
    >
      <van-image :src="userStore.user?.avatar" />
      <div class="content">
        <div class="time">{{ formatTime(createTime) }}</div>
        <van-image fit="contain" :src="msg.picture?.url" />
      </div>
    </div>
    <!-- 接收文字 -->
    <!-- 医生发的消息 -->
    <div
      class="msg msg-from"
      v-if="msgType === MsgType.MsgText && userStore.user?.id !== from"
    >
      <van-image :src="docInfo.avatar" />
      <div class="content">
        <div class="time">{{ formatTime(createTime) }}</div>
        <div class="pao">{{ msg.content }}</div>
      </div>
    </div>
    <!-- 处方 -->
    <div class="msg msg-recipe" v-if="msgType === MsgType.CardPre">
      <div class="content" v-if="msg.prescription">
        <div class="head van-hairline--bottom">
          <div class="head-tit">
            <h3>电子处方</h3>
            <p @click="showPrescription(msg.prescription?.id)">
              原始处方 <van-icon name="arrow"></van-icon>
            </p>
          </div>
          <p>
            {{ msg.prescription.name }}
            {{ msg.prescription.genderValue }}
            {{ msg.prescription.age }}岁
            {{ msg.prescription.diagnosis }}
          </p>
          <p>开方时间：{{ msg.prescription.createTime }}</p>
        </div>
        <div class="body">
          <div
            class="body-item"
            v-for="med in msg.prescription.medicines"
            :key="med.id"
          >
            <div class="durg">
              <p>{{ med.name }} {{ med.specs }}</p>
              <p>{{ med.usageDosag }}</p>
            </div>
            <div class="num">x{{ med.quantity }}</div>
          </div>
        </div>
        <div class="foot">
          <span @click="">购买药品</span>
        </div>
      </div>
    </div>
    <!-- 当问诊结束后，跳出评价卡片 -->
    <div
      class="msg msg-comment"
      v-if="msgType === MsgType.CardEva || msgType === MsgType.CardEvaForm"
    >
      <!-- 评价卡片，后期实现 -->
      <EvaluateCard></EvaluateCard>
    </div>
  </template>
</template>

<style lang="scss" scoped>
@import '@/styles/room.scss';
</style>
