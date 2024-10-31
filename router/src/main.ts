import { createApp } from 'vue';
import App from './App.vue';
import router, { setupRuter } from './router/index';
// import './style.css';


// 项目初始化方法
async function bootstrap() {
    const app = createApp(App);
    // 自定义路由
    setupRuter(app);
    // 异步处理，在路由处理完再挂载
    await router.isReady();
    app.mount('#app');
}
// 执行项目初始化方法
bootstrap();
