<!-- 消息卡片组件，根据消息类型判断显示不同消息卡片 -->
<script setup lang="ts">
import { IllnessTime } from '@/enum'
import { flagOptions, timeOptions } from '@/services/constants'
import { type FOLLOW_DOCTOR_DATA, type Image } from '@/types/consult'
import * as dayjs from 'dayjs'
const formatTime = (time: string) => dayjs(time).format('HH:mm:ss')

import type { Message } from '@/types/room'
import { MsgType } from '@/enum'
import { showImagePreview } from 'vant'
import useUserStore from '@/stores/modules/user'
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
    <!-- <div class="msg msg-to">
      <div class="content">
        <div class="time">20:12</div>
        <van-image
          fit="contain"
          src="https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/popular_3.jpg"
        />
      </div>
      <van-image
        src="https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/popular_3.jpg"
      />
    </div> -->
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
    <!-- 接收图片 -->
    <!-- <div class="msg msg-from">
      <van-image
        src="https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/popular_3.jpg"
      />
      <div class="content">
        <div class="time">20:12</div>
        <van-image
          fit="contain"
          src="https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/popular_3.jpg"
        />
      </div>
    </div> -->
    <!-- 处方卡片 -->
    <!-- <div class="msg msg-recipe">
      <div class="content">
        <div class="head van-hairline--bottom">
          <div class="head-tit">
            <h3>电子处方</h3>
            <p>原始处方 <van-icon name="arrow"></van-icon></p>
          </div>
          <p>李富贵 男 31岁 血管性头痛</p>
          <p>开方时间：2022-01-15 14:21:42</p>
        </div>
        <div class="body">
          <div class="body-item" v-for="i in 2" :key="i">
            <div class="durg">
              <p>优赛明 维生素E乳</p>
              <p>口服，每次1袋，每天3次，用药3天</p>
            </div>
            <div class="num">x1</div>
          </div>
        </div>
        <div class="foot"><span>购买药品</span></div>
      </div>
    </div> -->
  </template>

  <!-- 评价卡片，后期实现 -->
</template>

<style lang="scss" scoped>
@import '@/styles/room.scss';
</style>
