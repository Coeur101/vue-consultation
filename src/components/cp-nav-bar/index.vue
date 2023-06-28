<script setup lang="ts">
interface PROP_TYPE {
  title?: string
  right_title?: string
  left_title?: string
}

defineProps<PROP_TYPE>()
// 定义自定义事件
const emit = defineEmits<{ (e: 'click_right'): void; (e: 'click_left'): void }>()
</script>
<template>
  <div>
    <van-nav-bar
      :title="title"
      :left-text="left_title"
      :right-text="right_title"
      fixed
      left-arrow
      @click-left="emit('click_left')"
      @click-right="emit('click_right')"
    />
  </div>
</template>

<style lang="scss" scoped>
::v-deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }
    &__text {
      font-size: 15px;
    }
  }
}
</style>
