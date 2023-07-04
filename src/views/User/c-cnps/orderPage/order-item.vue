<script setup lang="ts">
import { OrderType } from '@/enum'
import { useCancelOrder } from '@/hooks/useCancelOrder'
import { useDelOrder } from '@/hooks/useDelOrder'
import { useRouter } from 'vue-router'
import CpMedicines from '@/components/cp-medicines/index.vue'
import type { MedicineInfo } from '@/types/medicine'
const router = useRouter()
const props = defineProps<{
  item: MedicineInfo
}>()

const emit = defineEmits(['on-delete'])
const { handleCancelOrder, loading } = useCancelOrder(() => {
  emit('on-delete', props.item.id)
})
const { handleDelOrder, deleteLoading } = useDelOrder(() => {
  emit('on-delete', props.item.id)
})

const handleSaveOrder = () => {
  router.push('/user/consult/' + props.item.id)
}
</script>

<template>
  <div class="consult-item">
    <cp-medicines
      :medicines="item.medicines"
      @click="$router.push(`/user/order/${item.id}`)"
    ></cp-medicines>
    <div class="foot" v-if="item.status === OrderType.MedicinePay">
      <van-button
        class="gray"
        plain
        size="small"
        round
        @click="handleCancelOrder(item)"
        :loading="loading"
        >取消订单</van-button
      >
      <van-button
        type="primary"
        plain
        size="small"
        round
        @click="handleSaveOrder"
        :disabled="loading"
      >
        去支付
      </van-button>
    </div>
    <div class="foot" v-if="item.status === OrderType.MedicineCancel">
      <van-button
        class="gray"
        plain
        size="small"
        round
        @click="handleDelOrder(item)"
        :loading="deleteLoading"
        >删除订单</van-button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-item {
  border-radius: 4px;
  box-shadow: 0px 0px 22px 0px rgba(245, 245, 245, 0.1);
  background-color: #fff;
  margin-bottom: 10px;
  .foot {
    padding: 0 15px 15px 15px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .van-button {
      margin-left: 10px;
      padding: 0 16px;
      &.gray {
        color: var(--cp-text3);
        background-color: var(--cp-bg);
      }
    }
    .more {
      color: var(--cp-tag);
      flex: 1;
      font-size: 13px;
    }
  }
}
</style>
