/**
 * 自动注册路由
 */

import { RouteRecordRaw } from 'vue-router';

// vite api 自动化加载布局文件
const layouts = import.meta.glob('../layouts/*.vue', { eager: true });
// 获取views下所有子路由
const views = import.meta.glob('../views/**/*.vue', { eager: true });

function getRoutes() {
    const layoutRoutes = [] as RouteRecordRaw[];
    // 遍历布局路由
    Object.entries(layouts).forEach(([file, module]) => {
        // 获取布局路由
        const route = getRouteByModule(file, module as { [key: string]: any });
        // 获取所有布局路由对应的子路由
        route.children = getChildernRoutes(route);
        layoutRoutes.push(route);
    });
    return layoutRoutes;
}

/**
 * 获取布局路由的子路由
 */

function getChildernRoutes(layoutRoutes: RouteRecordRaw) {
    const routes = [] as RouteRecordRaw[];
    Object.entries(views).forEach(([file, module]) => {
        // 如果包含布局路由就可以进行拼接路由并返回所在路由下的子路由
        if (file.includes(`../views/${layoutRoutes.name as string}`)) {
            const route = getRouteByModule(file, module as { [key: string]: any });
            console.log('route', route)
        }
    });
    return routes;
}

/**
 * 获取路由数据返回数组
 * @param file 路径字符串
 * @param module 路由路径函数
 * @returns
 */
function getRouteByModule(file: string, module: { [key: string]: any }) {
    // 每条路由字符串通过正则截取获取路由的name
    const name = file.replace(/.+layouts\/|.+views\/|\.vue/gi, '');
    // 格局数据组成路由对象
    const route = {
        name: name.replace('/', '.'),
        path: `/${name}`,
        component: module.default
    } as RouteRecordRaw;
    // 如果页面有自定义路由就进行合并
    return Object.assign(route, module.default?.route);
}
export default getRoutes();
