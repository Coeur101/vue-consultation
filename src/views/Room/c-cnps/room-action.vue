<script setup lang="ts">
import { OrderType } from '@/enum'
import type { UploaderAfterRead } from 'vant/lib/uploader/types'
import type { Image } from '@/types/consult'
import { reqImg } from '@/api/consult'
import { showLoadingToast } from 'vant'
const text = ref('')
defineProps<{
  disabled?: OrderType
}>()
const emit = defineEmits<{
  (e: 'send-text', data?: string): void
  (e: 'send-image', img: Image): void
}>()
// 子传父，传入发送的消息
const handleSendText = () => {
  emit('send-text', text.value)
  text.value = ''
}
// 发送图片消息
const handleSendImage: UploaderAfterRead = async (data) => {
  if (Array.isArray(data)) return
  if (!data.file) return
  const t = showLoadingToast('正在加载')
  const res = await reqImg(data.file)
  t.close()
  emit('send-image', res.data)
}
</script>

<template>
  <div class="room-action">
    <van-field
      type="text"
      class="input"
      v-model="text"
      :border="false"
      placeholder="问医生"
      autocomplete="off"
      @keyup.enter="handleSendText"
      :disabled="disabled !== OrderType.ConsultChat"
    ></van-field>
    <van-uploader
      :disabled="disabled !== OrderType.ConsultChat"
      :preview-image="false"
      :after-read="handleSendImage"
    >
      <cp-icon name="consult-img" />
    </van-uploader>
  </div>
</template>

<style lang="scss" scoped>
.room-action {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 1;
  box-sizing: border-box;
  .input {
    background-color: var(--cp-bg);
    border: none;
    border-radius: 25px;
    margin-right: 10px;
    padding: 8px 15px;
  }
  .cp-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
