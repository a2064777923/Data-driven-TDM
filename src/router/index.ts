import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import type {RouteRecordRaw} from "vue-router"
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
	//component: () => import('@/views/HomeView.vue'),
    redirect: 'home/index',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    children:[
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/index/index.vue'),
      }
    ]
  },
  {
	  path:'/powerbi',
	  name: 'powerbi',
	  component:() => import('@/views/powerBI.vue'),
  }
]
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})
/*
router.beforeEach((to, from, next) => {
  next();
})
*/
export default router
