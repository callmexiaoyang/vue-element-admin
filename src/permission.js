import store from '@/store'
import router from '@/router'

// 白名单
const whiteList = ['/login', '/404']
router.beforeEach(async function(to, from, next) {
  // 判断是否有token，有则判断是否登录页
  if (store.getters.token) {
    if (to.path === '/login') {
      // 直接跳转首页
      next('/')
    } else {
      if (!store.getters.useInfo) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
