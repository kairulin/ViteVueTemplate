import navList from './nav.ts'
const generateRoutes = (list: RouteConfig[], basePath = '') => {   
    const routes: RouteConfig[] = [];

    list.forEach(item => {
        const path = `${basePath}/${item.path.replace(/\s+/g, '-').toLowerCase()}`; // 生成路径
        const component = item.name.replace(/\s+/g, '')
        const route: RouteConfig = {
            path,
            name: item.name,
            nickname: item.nickname,
            children: [],
            ...(!item.children.length ? {component: () => import(`@/views/${component}.vue`)} : {}) // 动态导入组件
            // component: () => import(`@/components/GridLayout.vue`) // 动态导入组件
        };
        if (item.children && item.children.length > 0) {
            route.children = generateRoutes(item.children, path);
        }

        routes.push(route);
    });

    return routes;
};
const navRoutes = generateRoutes(navList)
export default navRoutes