<script setup lang="ts">
import type { KnowledgeType, HOMEINFO_ROW } from '@/types/consult'
import { reqKnwledge } from '@/api/consult/index'
import KnowledgeCard from './know-leage-card.vue'
import type { REQ_KNOWLEDGE_DATA } from '@/types/consult'
const props = defineProps<{
  type: KnowledgeType
}>()
const list = ref<HOMEINFO_ROW[]>([])
const loading = ref(false)
const finished = ref(false)
const params = ref<REQ_KNOWLEDGE_DATA>({
  type: props.type,
  current: 1,
  pageSize: 10
})
const onLoad = async () => {
  const result = await reqKnwledge(params.value)
  list.value.push(...(result.data?.rows as HOMEINFO_ROW[]))
  if ((params.value.current as number) >= result.data!.pageTotal) {
    finished.value = true
  } else {
    ;(params.value.current as number)++
  }
  loading.value = false
}
</script>

<template>
  <div class="knowledge-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <knowledge-card v-for="i in list" :item="i"></knowledge-card>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
