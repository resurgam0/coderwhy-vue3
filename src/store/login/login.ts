import { defineStore } from 'pinia'
import { accountLogin, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import { mapMenusToRoutes, mapMenuListToPermissions } from '@/utils/map-menus'
import useMainStore from '@/store/main/main'
interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  actions: {
    async loginAccountAction(account: { name: string; password: string }) {
      const loginResult = await accountLogin(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      // 请求所有的roles departments数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
      const permissions = mapMenuListToPermissions(userMenus)
      this.permissions = permissions

      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))
      router.push('/main')
    },
    loadLocalCacheAction() {
      // 用户进行刷新的时候默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        // 代表用户已经登录了
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        // 重要 获取登录用户的所有按钮的权限
        const permissions = mapMenuListToPermissions(userMenus)
        this.permissions = permissions
        // 动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})
export default useLoginStore
