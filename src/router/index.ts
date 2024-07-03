import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import navRoutes from '../utils/generateRoutes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:navRoutes as RouteRecordRaw[]
});
// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: HomeView
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (About.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import('../views/AboutView.vue')
//     },
//     {
//       path: '/button-page',
//       name: 'button',
//       component: () => import('../views/ButtonPage.vue')
//     }
//   ]
// })

export default router
