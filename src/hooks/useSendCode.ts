import { reqMoblieCode } from '@/api/user'
import { showToast, type FormInstance } from 'vant'

export const useSendCode = (mobile: string) => {
  const code = ref('')
  const time = ref(0)
  let timeId: number
  const form = ref<FormInstance>()
  const sendCode = async () => {
    if (time.value > 0) return
    // 必须要通过校验才能发送验证码
    await form.value?.validate('mobile')
    try {
      const result = await reqMoblieCode(mobile, 'login')
      showToast({
        type: 'success',
        message: '发送成功'
      })
      code.value = result.data.code
      time.value = 60
      clearInterval(timeId)
      timeId = setInterval(() => {
        time.value--
        if (time.value <= 0) window.clearInterval(timeId)
      }, 1000)
    } catch (error) {}
  }
  // 组件卸载后，删除定时器
  onUnmounted(() => {
    window.clearInterval(timeId)
  })
  return {
    form,
    code,
    time,
    sendCode
  }
}
