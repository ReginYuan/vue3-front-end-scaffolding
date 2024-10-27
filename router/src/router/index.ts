import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './modues/routes';
const router = createRouter({
    history: createWebHistory(),
    routes
});

// 自定义路由方法
export function setupRuter(app: App) {
    app.use(router);
}

export default router;
