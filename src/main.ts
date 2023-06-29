import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { registerStore } from './stores'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/popup/style'
import '@/styles/main.scss'
import 'virtual:svg-icons-register'
const app = createApp(App)

app.use(registerStore)
app.use(router)
app.mount('#app')
