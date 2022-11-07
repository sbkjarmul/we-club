import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
import './style.scss'
import App from './App.vue'
import { plugin, defaultConfig } from '@formkit/vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(plugin, defaultConfig({
  theme: "genesis"
}))
app.mount('#app')