/**
 * 为项目全局组件声明类型
 */
import CpNavBar from '@/components/cp-nav-bar/index.vue'
import CpIcon from '@/components/cp-icon/index.vue'
import CpRadioBtn from '@/components/cp-radio-btn/index.vue'
declare module 'vue' {
  interface GlobalComponents {
    CpNavBar: typeof CpNavBar
  }
}
declare module 'vue' {
  interface GlobalComponents {
    CpIcon: typeof CpIcon
  }
}
declare module 'vue' {
  interface GlobalComponents {
    CpRadioBtn: typeof CpRadioBtn
  }
}
