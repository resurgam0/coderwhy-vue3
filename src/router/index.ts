import { createRouter, createWebHashHistory } from 'vue-router'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/main',
      component: () => import('../views/main/main.vue'),
      name: 'main',
    },
    {
      path: '/:patchMatch(.*)',
      component: () => import('../views/not-found/not-found.vue')
    }
  ]
})


// 导航守卫 参数 to跳转到的位置 from从哪里跳过来
router.beforeEach((to, from) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path === '/main' && !token) {
    // 只有登录成功才能进入到main页面
    return '/login'
  }
  // 如果是进入到main
  if(to.path==='/main'){
    return firstMenu?.url
  }
})
export default router
