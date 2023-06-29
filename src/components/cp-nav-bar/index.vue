<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
interface PROP_TYPE {
  title?: string
  right_title?: string
  left_title?: string
  back?: () => void
}
const handleClickLeft = () => {
  if (props.back) {
    props.back()
  } else {
    // 判断是否有上级页面，有则返回
    if (history.state.back) {
      router.back()
    } else {
      // 不存在则跳回首页
      router.push('/')
    }
  }
}
const props = defineProps<PROP_TYPE>()
// 定义自定义事件
const emit = defineEmits<{ (e: 'click_right'): void }>()
</script>
<template>
  <div>
    <van-nav-bar
      :title="title"
      :left-text="left_title"
      :right-text="right_title"
      fixed
      left-arrow
      @click-left="handleClickLeft"
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
