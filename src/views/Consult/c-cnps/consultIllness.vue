<script setup lang="ts">
import { useConsultStore } from '@/stores/modules/consult'
import type { ConsultIllness, Image } from '@/types/consult'
import { timeOptions, flagOptions } from '@/services/constants'
import { showConfirmDialog } from 'vant'
import { reqImg } from '@/api/consult/index'
import type {
  UploaderAfterRead,
  UploaderFileListItem
} from 'vant/lib/uploader/types'
import { useRouter } from 'vue-router'
const consultStore = useConsultStore()
const router = useRouter()

const form = ref<ConsultIllness>({
  illnessDesc: '',
  illnessTime: undefined,
  consultFlag: undefined,
  pictures: []
})
const imageList = ref<Image[]>()
// 按钮禁用状态
const disabled = computed(() => {
  return (
    !form.value.illnessDesc ||
    form.value.illnessTime === undefined ||
    form.value.consultFlag === undefined
  )
})
const handleAfterRead: UploaderAfterRead = (item) => {
  if (Array.isArray(item)) return
  if (!item.file) return
  // 开始上传
  item.status = 'uploading'
  item.message = '上传中...'
  reqImg(item.file)
    .then((res) => {
      item.status = 'done'
      item.message = undefined
      item.url = res.data.url
      if (item.status !== 'done') {
        imageList.value?.push(res.data)
      }
      form.value.pictures?.push(res.data)
    })
    .catch(() => {
      item.status = 'failed'
      item.message = '上传失败'
    })
}
const handleDelImg = (file: UploaderFileListItem) => {
  form.value.pictures = form.value.pictures?.filter(
    (pic) => pic.url !== file.url
  )
}
const next = () => {
  // 保存信息到pinia，跳转路由
  consultStore.setIllness(form.value)
  // 跳转家庭档案页面，如果为1代表作为选择患者使用
  router.push('/user/patient?isSelect=1')
}
// 回显数据
onMounted(() => {
  if (consultStore.consult.illnessDesc) {
    showConfirmDialog({
      title: '温馨提示',
      message: '是否恢复您之前填写的病情信息呢？',
      // 是否在页面回退时自动关闭，默认值为true
      closeOnPopstate: false
    }).then(() => {
      for (const key in form.value) {
        ;(form.value as any)[key] = (consultStore.consult as any)[key]
      }
      form.value.pictures = consultStore.consult.pictures || []
    })
  }
})
</script>

<template>
  <div class="consult-illness-page">
    <cp-nav-bar title="图文问诊" />
    <!-- 医生提示 -->
    <div class="illness-tip van-hairline--bottom">
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <div class="info">
        <p class="tit">在线医生</p>
        <p class="tip">
          请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助
        </p>
        <p class="safe">
          <cp-icon name="consult-safe" /><span>内容仅医生可见</span>
        </p>
      </div>
    </div>
    <!-- 收集信息 -->
    <div class="illness-form">
      <!-- 病情描述 -->
      <van-field
        type="textarea"
        rows="3"
        placeholder="请详细描述您的病情，病情描述不能为空"
        v-model="form.illnessDesc"
      ></van-field>
      <div class="item">
        <p>本次患病多久了？</p>
        <cp-radio-btn
          :options="timeOptions"
          v-model="form.illnessTime"
        ></cp-radio-btn>
      </div>
      <div class="item">
        <p>此次病情是否去医院就诊过？</p>
        <cp-radio-btn :options="flagOptions" v-model="form.consultFlag" />
      </div>
      <div class="illness-img">
        <van-uploader
          v-model="imageList"
          upload-icon="photo-o"
          max-count="9"
          max-size="1024*1024*5"
          upload-text="上传图片"
          @delete="handleDelImg"
          :after-read="handleAfterRead"
        ></van-uploader>
        <p class="tip">上传内容仅医生可见,最多9张图,最大5MB</p>
      </div>
      <van-button block round :disabled="disabled" type="primary" @click="next"
        >下一步</van-button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-illness-page {
  padding-top: 46px;
}
.illness-tip {
  display: flex;
  padding: 15px;
  .img {
    width: 52px;
    height: 52px;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 10px;
  }
  .info {
    flex: 1;
    padding-left: 12px;
    .tit {
      font-size: 16px;
      margin-bottom: 5px;
    }
    .tip {
      padding: 12px;
      background: var(--cp-bg);
      color: var(--cp-text3);
      font-size: 13px;
      margin-bottom: 10px;
    }
    .safe {
      font-size: 10px;
      color: var(--cp-text3);
      display: flex;
      align-items: center;
      .cp-icon {
        font-size: 12px;
        margin-right: 2px;
      }
    }
  }
}
.illness-form {
  padding: 15px;
  .van-field {
    padding: 0;
    &::after {
      border-bottom: none;
    }
  }
  .item {
    > p {
      color: var(--cp-text3);
      padding: 15px 0;
    }
  }
}
.illness-img {
  padding-top: 16px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  .tip {
    font-size: 12px;
    color: var(--cp-tip);
  }
  ::v-deep() {
    .van-uploader {
      &__preview {
        &-delete {
          left: -6px;
          top: -6px;
          border-radius: 50%;
          background-color: var(--cp-primary);
          width: 20px;
          height: 20px;
          &-icon {
            transform: scale(0.9) translate(-22%, 22%);
          }
        }
        &-image {
          border-radius: 8px;
          overflow: hidden;
        }
      }
      &__upload {
        border-radius: 8px;
      }
      &__upload-icon {
        color: var(--cp-text3);
      }
    }
  }
}
</style>
