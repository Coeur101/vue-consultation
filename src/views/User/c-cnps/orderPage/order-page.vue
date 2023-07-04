<script setup lang="ts">
import { OrderType } from '@/enum'
import orderList from './order-list.vue'
</script>

<template>
  <div class="consult-page">
    <cp-nav-bar title="我的订单" />
    <van-tabs sticky>
      <van-tab title="待付款"
        ><order-list :type="OrderType.MedicinePay"
      /></van-tab>
      <van-tab title="待发货"
        ><order-list :type="OrderType.MedicineSend"
      /></van-tab>
      <van-tab title="待收货"
        ><order-list :type="OrderType.MedicineTake"
      /></van-tab>
      <van-tab title="已取消"
        ><order-list :type="OrderType.MedicineCancel"
      /></van-tab>
      <van-tab title="已完成"
        ><order-list :type="OrderType.MedicineComplete"
      /></van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.consult-page {
  padding-top: 46px;
  background-color: var(--cp-bg);
  min-height: calc(100vh - 46px);
}
</style>
