import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import './global.css'
import 'animate.css';
import router from './router/index'
import 'ant-design-vue/dist/antd.css';
import './permission'
const app=createApp(App)
app.use(router)
app.use(Antd).mount('#app');

