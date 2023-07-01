<script setup lang="ts">
import { reqOrderInfo, reqOrder, reqPay } from '@/api/consult'
import { useConsultStore } from '@/stores/modules/consult'
import type { ConsultOrderPreData, PartialConsult } from '@/types/consult'
import { showConfirmDialog, showDialog, showFailToast } from 'vant'
import { useRouter } from 'vue-router'
const router = useRouter()
const consultStore = useConsultStore()
const payInfo = ref<ConsultOrderPreData>()
const show = ref(false)
const agree = ref(false)
const loading = ref(false)
const orderId = ref('')
const paymentMethod = ref<(0 | 1) & number>()
const loadData = async () => {
  try {
    const res = await reqOrderInfo({
      type: consultStore.consult.type,
      illnessType: consultStore.consult.illnessType
    })
    payInfo.value = res.data
    consultStore.setCoupon(payInfo.value.couponId)
    // type缺少，跳转回问诊首页
  } catch (error) {
    router.push('/')
  }
}
// 打开支付抽屉的立即支付
const handleShowDrawerPay = async () => {
  if (!agree.value) {
    showFailToast('请先同意支付协议')
    return
  }
  loading.value = true
  try {
    const res = await reqOrder(consultStore.consult)
    orderId.value = res.data.id
    loading.value = false
    show.value = true
    // 创建订单成功后，清空患者的信息
    consultStore.clear()
  } catch (error) {
    loading.value = false
  }
}
// 真正的支付按钮,点击支付弹层按钮，获取支付地址进行跳转支付
const handlePay = async () => {
  if (!paymentMethod.value) return showFailToast('请选择支付方式')
  const res = await reqPay({
    paymentMethod: paymentMethod.value,
    orderId: orderId.value,
    // 传入回跳地址为问诊室，支付成功后跳转进入
    payCallback: 'http://127.0.0.1:5173/room'
  })
  // 跳转到支付宝的页面支付地址
  window.location.href = res.data.payUrl
}
const onClose = async () => {
  show.value = await showConfirmDialog({
    title: '关闭支付',
    message: '取消支付将无法获得医生回复，医生接诊名额有限，是否确认关闭？',
    cancelButtonText: '仍要关闭',
    confirmButtonText: '继续支付'
  })
    .then(() => {
      return true
    })
    .catch(() => {
      orderId.value = ''
      // 跳回问诊记录
      router.push('/user/consult')
      return false
    })
}

onMounted(() => {
  type Key = keyof PartialConsult
  // 刷新页面后信息丢失的问题
  const validKeys: Key[] = [
    'type',
    'illnessType',
    'depId',
    'illnessDesc',
    'illnessTime',
    'consultFlag',
    'patientId'
  ]
  const valid = validKeys.every(
    (key) => consultStore.consult[key] !== undefined
  )
  if (!valid) {
    return showDialog({
      title: '温馨提示',
      message:
        '问诊信息不完整请重新填写，如有未支付的问诊订单可在问诊记录中继续支付！',
      closeOnPopstate: false
    }).then(() => {
      router.push('/')
    })
  }
  loadData()
})
</script>

<template>
  <div class="consult-pay-page">
    <cp-nav-bar title="支付" />
    <div class="pay-info">
      <p class="tit">
        图文问诊 {{ payInfo?.payment === undefined ? 0 : payInfo.payment }} 元
      </p>
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <p class="desc">
        <span>极速问诊</span>
        <span>自动分配医生</span>
      </p>
    </div>
    <van-cell-group>
      <van-cell
        title="优惠券"
        :value="`-¥${
          payInfo?.couponDeduction === undefined ? 0 : payInfo.couponDeduction
        }`"
      />
      <van-cell
        title="积分抵扣"
        :value="`-¥${
          payInfo?.pointDeduction === undefined ? 0 : payInfo.pointDeduction
        }`"
      />
      <van-cell
        title="实付款"
        :value="`¥${payInfo?.actualPayment || 0}`"
        class="pay-price"
      />
    </van-cell-group>
    <div class="pay-space"></div>
    <van-cell-group>
      <van-cell
        title="患者信息"
        :value="`${consultStore.patient?.name || ''} |  ${
          consultStore.patient?.gender ? '男' : '女'
        } | ${consultStore.patient?.age || ''}岁`"
      ></van-cell>
      <van-cell
        title="病情描述"
        :label="consultStore.consult.illnessDesc"
      ></van-cell>
    </van-cell-group>
    <div class="pay-schema">
      <van-checkbox v-model="agree"
        >我已同意 <span class="text">支付协议</span></van-checkbox
      >
    </div>
    <van-submit-bar
      button-type="primary"
      :price="payInfo?.actualPayment as number * 100 || 0"
      button-text="立即支付"
      @click="handleShowDrawerPay"
      :loading="loading"
      text-align="left"
      v-if="payInfo"
    />
    <!-- 弹出支付方式的抽屉 -->
    <van-action-sheet
      v-model:show="show"
      :closeable="false"
      :close-on-click-overlay="true"
      :close-on-popstate="false"
      @close="onClose"
      title="选择支付方式"
    >
      <div class="pay-type">
        <p class="amount">￥{{ payInfo?.actualPayment }}</p>
        <van-cell-group>
          <van-cell title="微信支付" @click="paymentMethod = 0">
            <template #icon><cp-icon name="consult-wechat" /></template>
            <template #extra
              ><van-checkbox :checked="paymentMethod === 0"
            /></template>
          </van-cell>
          <van-cell title="支付宝支付" @click="paymentMethod = 1">
            <template #icon><cp-icon name="consult-alipay" /></template>
            <template #extra
              ><van-checkbox :checked="paymentMethod === 1"
            /></template>
          </van-cell>
        </van-cell-group>
        <div class="btn">
          <van-button @click="handlePay" type="primary" round block
            >立即支付</van-button
          >
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<style lang="scss" scoped>
.consult-pay-page {
  padding: 46px 0 50px 0;
}
.pay-info {
  display: flex;
  padding: 15px;
  flex-wrap: wrap;
  align-items: center;
  .tit {
    width: 100%;
    font-size: 16px;
    margin-bottom: 10px;
  }
  .img {
    margin-right: 10px;
    width: 38px;
    height: 38px;
    border-radius: 4px;
    overflow: hidden;
  }
  .desc {
    flex: 1;
    > span {
      display: block;
      color: var(--cp-tag);
      &:first-child {
        font-size: 16px;
        color: var(--cp-text2);
      }
    }
  }
}
.pay-price {
  ::v-deep() {
    .vam-cell__title {
      font-size: 16px;
    }
    .van-cell__value {
      font-size: 16px;
      color: var(--cp-price);
    }
  }
}
.pay-space {
  height: 12px;
  background-color: var(--cp-bg);
}
.pay-schema {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  .text {
    color: var(--cp-primary);
  }
}
::v-deep() {
  .van-submit-bar__button {
    font-weight: normal;
    width: 160px;
  }
}
.pay-type {
  .amount {
    padding: 20px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  .btn {
    padding: 15px;
  }
  .van-cell {
    align-items: center;
    .cp-icon {
      margin-right: 10px;
      font-size: 18px;
    }
    .van-checkbox :deep(.van-checkbox__icon) {
      font-size: 16px;
    }
  }
}
</style>
