import { useAuthStore } from '@/stores/auth'

export const authGuard = async (to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth) {
    if (!authStore.isAuthenticated) {
      // 保存用户想要访问的页面
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
      return
    }

    // 如果没有用户信息，尝试获取
    if (!authStore.userProfile) {
      try {
        await authStore.fetchUserProfile()
      } catch (error) {
        console.error('Failed to fetch user profile:', error)
        next('/login')
        return
      }
    }
  }

  next()
}

export const guestGuard = (to, from, next) => {
  const authStore = useAuthStore()
  
  // 如果用户已登录，访问登录或注册页面时重定向到首页
  if (authStore.isAuthenticated && (to.name === 'login' || to.name === 'register')) {
    next('/')
    return
  }
  
  next()
}
