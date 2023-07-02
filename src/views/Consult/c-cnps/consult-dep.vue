<script setup lang="ts">
import { reqDepALl } from '@/api/consult'
import { useConsultStore } from '@/stores/modules/consult'
import type { TopDep } from '@/types/consult'
const consultStore = useConsultStore()
import { ref } from 'vue'
const active = ref(0)
const allDep = ref<TopDep[]>([])
const getAllDep = async () => {
  const { data } = await reqDepALl()
  allDep.value = data
}
const subDep = computed(() => allDep.value[active.value]?.child)
onMounted(() => {
  getAllDep()
})
</script>

<template>
  <div class="consult-dep-page">
    <cp-nav-bar title="选择科室" />
    <div class="wrapper">
      <van-sidebar v-model="active">
        <van-sidebar-item
          :title="item.name"
          v-for="item in allDep"
          :key="item.id"
        />
      </van-sidebar>
      <div class="sub-dep">
        <router-link
          @click="consultStore.setDep(item.id)"
          to="/consult/illness"
          v-for="item in subDep"
          :key="item.id"
          >{{ item.name }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.van-sidebar {
  width: 114px;
  &-item {
    padding: 14px;
    color: var(--cp-tag);
    &--select {
      color: var(--cp-main);
      font-weight: normal;
      &::before {
        display: none;
      }
    }
  }
}
.consult-dep-page {
  padding-top: 46px;
  .wrapper {
    height: calc(100vh - 46px);
    overflow: hidden;
    display: flex;
    .sub-dep {
      flex: 1;
      height: 100%;
      overflow-y: auto;
      > a {
        display: block;
        padding: 14px 30px;
        color: var(--cp-dark);
      }
    }
  }
}
</style>
