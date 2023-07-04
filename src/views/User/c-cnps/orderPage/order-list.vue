<script setup lang="ts">
import type { OrderType } from '@/enum'
import OrderItem from './order-item.vue'
import type { MedicineInfo, REQ_ORDER_PARAMS } from '@/types/medicine'
import { reqMedicineOrderList } from '@/api/Medicine'
const list = ref<MedicineInfo[]>([])
const props = defineProps<{
  type: OrderType
}>()
// 定义需要渲染的条数和页数、类型
const params = ref<REQ_ORDER_PARAMS>({
  status: props.type,
  current: 1,
  pageSize: 10
})
const loading = ref(false)
// 判断是否到最底部
const finished = ref(false)
const onLoad = async () => {
  const res = await reqMedicineOrderList(params.value)
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
      <order-item
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
