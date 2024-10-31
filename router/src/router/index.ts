import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
// 路由
import routes from './routes';
// 引入自动注册路由
import layoutRoutes from './autoload';

const router = createRouter({
    history: createWebHistory(),
    routes:[
        ...routes,
        ...layoutRoutes
    ]
});

// 自定义路由方法
export function setupRuter(app: App) {
    app.use(router);
}

export default router;
