/// <reference types="vite/client" />
declare module '*.vue' {
  // 引入组件类型
  import { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}
declare module '*.mjs' {}
