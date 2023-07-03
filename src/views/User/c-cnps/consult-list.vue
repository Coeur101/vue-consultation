<script setup lang="ts">
import type { ConsultType } from '@/enum'
import ConsultItem from './consult-item.vue'
import type { ConsultOrderItem, ConsultOrderListParams } from '@/types/consult'
import { reqOrderList } from '@/api/consult'
const list = ref<ConsultOrderItem[]>([])
const props = defineProps<{
  type: ConsultType
}>()
// 定义需要渲染的条数和页数、类型
const params = ref<ConsultOrderListParams>({
  type: props.type,
  current: 1,
  pageSize: 5
})
const loading = ref(false)
// 判断是否到最底部
const finished = ref(false)
const onLoad = async () => {
  const res = await reqOrderList(params.value)
  list.value.push(...res.data.rows)
  if ((params.value.current as number) < res.data.pageTotal) {
    ;(params.value.current as number)++
  } else {
    finished.value = true
  }
  loading.value = false
}
const onDelete = (id: string) => {
  // 过滤数据重新渲染，假如删除的是当前页的最后一个元素，则重新请求
  list.value = list.value.filter((item) => item.id !== id)
  if (!list.value.length) onLoad()
}
</script>

<template>
  <div class="consult-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <consult-item
        @on-delete="onDelete"
        v-for="item in list"
        :key="item.id"
        :item="item"
      />
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.consult-list {
  padding: 10px 15px;
}
</style>
