<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { mobileRules, passwordRules, codeRules } from '@/utils/rules'
import { showToast } from 'vant'
import { useSendCode } from '@/hooks/useSendCode'
import { reqLogin, reqCodeLogin } from '@/api/user/index'
import useUserStore from '@/stores/modules/user'
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const agree = ref(false)
const isPass = ref(false)

// 登录所需
const mobile = ref('13230000077')
const password = ref('abc12345')
const { code, form, time, sendCode } = useSendCode(mobile.value)
const switchLogin = () => {
  isPass.value = !isPass.value
}
const handleClickRight = () => {}
// 兜底校验，只有校验通过了才能使用登录按钮
const login = async () => {
  if (!agree.value) {
    showToast({
      type: 'fail',
      message: '请勾选用户协议'
    })
    return
  }
  try {
    const result = isPass.value
      ? await reqCodeLogin(mobile.value, code.value)
      : await reqLogin(mobile.value, password.value)
    userStore.setUser(result.data)
    router.push(
      route.query.returnUrl ? (route.query.returnUrl as string) : '/user'
    )
  } catch (error) {}
}
</script>
<template>
  <div class="login-page">
    <cp-nav-bar
      title="登录"
      right_title="注册"
      left_title=""
      @click_right="handleClickRight"
    ></cp-nav-bar>
    <!-- 头部 -->
    <div class="login-head">
      <h3>{{ isPass ? '短信验证码登录' : '密码登录' }}</h3>
      <a href="javascript:;" @click="switchLogin">
        <span>{{ !isPass ? '短信验证码登录' : '密码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 表单 -->
    <van-form @submit="login" ref="form" autocomplete="off">
      <van-field
        placeholder="请输入手机号"
        v-model="mobile"
        :rules="mobileRules"
        name="mobile"
        type="tel"
      ></van-field>
      <template v-if="isPass">
        <van-field
          placeholder="请输入验证码"
          v-model="code"
          type="tel"
          :rules="codeRules"
        >
          <template #button>
            <van-button
              size="small"
              @click="sendCode"
              :class="{ active: time > 0 }"
              >{{ time > 0 ? `${time}s后再次发送` : '发送验证码' }}</van-button
            >
          </template>
        </van-field>
      </template>
      <template v-else>
        <van-field
          placeholder="请输入密码"
          v-model="password"
          :rules="passwordRules"
          type="password"
        ></van-field>
      </template>
      <div class="cp-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block native-type="submit" round type="primary"
          >登 录</van-button
        >
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
    <!-- 底部 -->
    <div class="login-other" v-if="!isPass">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-page {
    padding-top: 46px;
  }
  &-head {
    display: flex;
    padding: 30px 30px 50px;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    h3 {
      font-weight: normal;
      font-size: 24px;
    }
    a {
      font-size: 15px;
    }
  }
  &-other {
    margin-top: 60px;
    padding: 0 30px;
    .icon {
      display: flex;
      justify-content: center;
      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}
.van-form {
  padding: 0 14px;
  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }
  .btn-send {
    color: var(--cp-primary);
    &.active {
      color: rgba(22, 194, 163, 0.5);
    }
  }
}
</style>
