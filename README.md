## 项目介绍

使用基于 vite 的 create-vue 脚手架，采用 Vue3 全家桶：Vue3+TypeScript+Vue-Router+Pinia 的最新组合。

## 技术方案

1. 基于 vue3+typescript 中大型项目开发解决方案
2. 基于 vant 组件库快速构建 H5 界面解决方案
3. 基于 vite 的 create-vue 构建 vue3 项目解决方案
4. 基于 pinia 的状态管理解决方案
5. 基于 pinia-plugin-persistedstate 状态持久化解决方案
6. 基于 vue-router 的前端路由解决方案
7. 基于 @vuecore/use 的组合式 API 工具库解决方案
8. 基于 id-validator 的身份证信息校验解决方案
9. 基于 postcss-px-to-viewport 移动端适配解决方案
10. 基于 vite-plugin-svg-icons 的 svg 图标组件解决方案
11. 基于 vite-plugin-html 自定义 html 模板解决方案
12. 基于 unplugin-vue-components 组件自动注册解决方案
13. 基于 socket.io 的即时通讯问诊室解决方案
14. 第三方支付解决方案
15. 第三方地图解决方案
16. pnpm 包管理方案
17. css 变量主题定制方案
18. 自定义 hook 解决方案
19. axios 二次封装解决方案
20. services API 接口分层解决方案
21. 基于 vant 的通用组件封装解决方案

## 业务涵盖

包括了找医生、快速问诊、开药门诊、疾病查询，健康百科等功能。包含第三方支付，第三方登录，地图轨迹等业务。

## 目录结构

```
vue-consult-h5
├─ .env.development
├─ .env.production
├─ .eslintrc.cjs
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
├─ .gitignore
├─ .prettierrc.json
├─ auto-imports.d.ts
├─ env.d.ts
├─ index.html
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.js
├─ public
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ api
│  │  ├─ consult
│  │  │  └─ index.ts
│  │  └─ user
│  │     └─ index.ts
│  ├─ App.vue
│  ├─ assets
│  │  ├─ ad.png
│  │  ├─ avatar-doctor.svg
│  │  ├─ car.png
│  │  ├─ consult-fast.png
│  │  ├─ end.png
│  │  ├─ qq.svg
│  │  └─ start.png
│  ├─ components
│  │  ├─ cp-icon
│  │  │  └─ index.vue
│  │  ├─ cp-nav-bar
│  │  │  └─ index.vue
│  │  ├─ cp-pay-sheet
│  │  │  └─ index.vue
│  │  └─ cp-radio-btn
│  │     └─ index.vue
│  ├─ enum
│  │  └─ index.ts
│  ├─ hooks
│  │  ├─ useCancelOrder.ts
│  │  ├─ useDelOrder.ts
│  │  ├─ useFollow.ts
│  │  ├─ useSendCode.ts
│  │  └─ useShowPrescription.ts
│  ├─ icons
│  │  ├─ consult
│  │  │  ├─ alipay.svg
│  │  │  ├─ delete.svg
│  │  │  ├─ doctor.svg
│  │  │  ├─ download.svg
│  │  │  ├─ img.svg
│  │  │  ├─ message.svg
│  │  │  ├─ safe.svg
│  │  │  ├─ upload.svg
│  │  │  └─ wechat.svg
│  │  ├─ home
│  │  │  ├─ article-active.svg
│  │  │  ├─ article-default.svg
│  │  │  ├─ docs.svg
│  │  │  ├─ doctor.svg
│  │  │  ├─ find.svg
│  │  │  ├─ graphic.svg
│  │  │  ├─ index-active.svg
│  │  │  ├─ index-default.svg
│  │  │  ├─ mine-active.svg
│  │  │  ├─ mine-default.svg
│  │  │  ├─ notice-active.svg
│  │  │  ├─ notice-default.svg
│  │  │  ├─ order.svg
│  │  │  ├─ prescribe.svg
│  │  │  ├─ rp.svg
│  │  │  └─ search.svg
│  │  ├─ login
│  │  │  ├─ eye-off.svg
│  │  │  └─ eye-on.svg
│  │  └─ user
│  │     ├─ add.svg
│  │     ├─ arrow.svg
│  │     ├─ edit.svg
│  │     ├─ finished.svg
│  │     ├─ paid.svg
│  │     ├─ received.svg
│  │     ├─ shipped.svg
│  │     ├─ tool-01.svg
│  │     ├─ tool-02.svg
│  │     ├─ tool-03.svg
│  │     ├─ tool-04.svg
│  │     ├─ tool-05.svg
│  │     ├─ tool-06.svg
│  │     └─ tool-07.svg
│  ├─ main.ts
│  ├─ router
│  │  ├─ index.ts
│  │  └─ routes.ts
│  ├─ services
│  │  └─ constants.ts
│  ├─ stores
│  │  ├─ index.ts
│  │  └─ modules
│  │     ├─ consult.ts
│  │     └─ user.ts
│  ├─ styles
│  │  ├─ main.scss
│  │  └─ room.scss
│  ├─ types
│  │  ├─ components.d.ts
│  │  ├─ consult.d.ts
│  │  ├─ global.d.ts
│  │  ├─ room.d.ts
│  │  └─ user.d.ts
│  ├─ utils
│  │  ├─ filter.ts
│  │  ├─ request.ts
│  │  └─ rules.ts
│  └─ views
│     ├─ Article
│     │  └─ index.vue
│     ├─ Consult
│     │  ├─ c-cnps
│     │  │  ├─ consult-dep.vue
│     │  │  ├─ consult-pay.vue
│     │  │  └─ consultI-llness.vue
│     │  └─ index.vue
│     ├─ Home
│     │  ├─ c-cnps
│     │  │  ├─ doctor-card.vue
│     │  │  ├─ follow-doctor.vue
│     │  │  ├─ know-leage-card.vue
│     │  │  └─ know-leage-list.vue
│     │  └─ index.vue
│     ├─ Layout
│     │  └─ index.vue
│     ├─ Login
│     │  └─ index.vue
│     ├─ Notify
│     │  └─ index.vue
│     ├─ Room
│     │  ├─ c-cnps
│     │  │  ├─ evaluate-card.vue
│     │  │  ├─ room-action.vue
│     │  │  ├─ room-message.vue
│     │  │  └─ room-status.vue
│     │  └─ index.vue
│     └─ User
│        ├─ c-cnps
│        │  ├─ consult-detail.vue
│        │  ├─ consult-item.vue
│        │  ├─ consult-list.vue
│        │  ├─ consult-more.vue
│        │  ├─ consult-page.vue
│        │  └─ patient-page.vue
│        └─ index.vue
```

## 依赖安装

```
pnpm install
```

## 项目启动

```
pnpm dev
```





