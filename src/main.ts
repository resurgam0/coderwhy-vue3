import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import router from './router'
import store from './store'
import registerIcon from './global/register-icons'

// 全局注册element-plus 方便和简洁
const app = createApp(App)
app.use(registerIcon)
app.use(store)

app.use(router)
app.mount('#app')
