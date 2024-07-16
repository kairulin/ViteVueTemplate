import navList from './nav.ts'
const generateRoutes = (list: RouteConfig[], basePath = '') => {   
    const routes: RouteConfig[] = [];

    list.forEach(item => {
        const path = `${basePath}/${item.name.replace(/\s+/g, '-').toLowerCase()}`; // 生成路径
        const component = item.name.replace(/\s+/g, '')
        const route: RouteConfig = {
            path,
            name: item.name,
            nickname: item.nickname,
            children: [],
            component: () => import(`@/views/${component}.vue`) // 动态导入组件
            // component: () => import(`@/components/GridLayout.vue`) // 动态导入组件
        };
        console.log('route', route)
        if (item.children && item.children.length > 0) {
            route.children = generateRoutes(item.children, path);
        }

        routes.push(route);
    });

    return routes;
};
const navRoutes = generateRoutes(navList)
export default navRoutes