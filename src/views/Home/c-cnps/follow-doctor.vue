<script setup lang="ts">
import doctorCard from './doctor-card.vue'
import { reqFollowDoctor } from '@/api/consult/index'
import type { FOLLOW_DOCTOR_DATA } from '@/types/consult'
// 使用vueuse 动态获取屏幕宽度，使轮播图适配
// 使用150/375的比例，再去乘上当前屏幕的宽度，就是轮播图的宽度
import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize()
const list = ref<FOLLOW_DOCTOR_DATA[]>([])
const loadData = async () => {
  const res = await reqFollowDoctor({ current: 1, pageSize: 5 })
  list.value = res.data?.rows as FOLLOW_DOCTOR_DATA[]
}
onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="follow-doctor">
    <div className="head">
      <p>推荐关注</p>
      <a href="javascript:;"> 查看更多<i class="van-icon van-icon-arrow" /></a>
    </div>
    <div class="body">
      <!-- 去除 指示器，关闭 无缝滚动，设置一次滚动一个卡片 -->
      <van-swipe
        :width="(150 / 375) * width"
        :showIndicators="false"
        :loop="false"
      >
        <van-swipe-item v-for="item in list" :key="item.id">
          <doctorCard :item="item"></doctorCard>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.follow-doctor {
  background-color: var(--cp-bg);
  height: 250px;
  .head {
    display: flex;
    justify-content: space-between;
    height: 45px;
    align-items: center;
    padding: 0 15px;
    font-size: 13px;
    > a {
      color: var(--cp-tip);
    }
  }
  .body {
    width: 100%;
    overflow: hidden;
  }
}
</style>
