import { createApp } from 'vue'
 
import App from './App.vue'
 
//引入路由文件
import router from './router/index'
//导入store
import store from './store/index'
//使用ElementPlus插件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
 
//使用路由组件
const app=createApp(App)
//全局导入Element图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
//使用store
app.use(store)
//使用ElementPlus插件
app.use(ElementPlus)
app.use(router)

app.mount('#app')