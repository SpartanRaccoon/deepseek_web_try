import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/reading/:type',
    name: 'reading-input',
    component: () => import('@/views/ReadingInput.vue')
  },
  {
    path: '/reading/:type/result/:id',
    name: 'reading-result',
    component: () => import('@/views/ReadingResult.vue')
  },
  {
    // 404 页面
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router
