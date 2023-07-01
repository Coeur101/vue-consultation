<script setup lang="ts">
import { OrderType } from '@/enum'

const text = ref('')
defineProps<{
  status?: OrderType
}>()
const emit = defineEmits<{
  (e: 'send-text', data?: string): void
}>()
// 子传父，传入发送的消息
const handleSendText = () => {
  emit('send-text', text.value)
  text.value = ''
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
      :disabled="status === OrderType.ConsultChat"
    ></van-field>
    <van-uploader :preview-image="false" :disabled="true">
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
