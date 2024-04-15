import {
  postUsersListData,
  deleteUserById,
  newUserData,
  editUserData,
  postPageListData,
  deletePageById,
  newPageData,
  editPageData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'
import useMainStore from '../main'
const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUsersListData(queryInfo)
      const { totalCount, list } = usersListResult.data
      this.usersTotalCount = totalCount
      this.usersList = list
    },
    async deleteUserByIdAction(id: number) {
      await deleteUserById(id)
      // 重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async newUserDataAction(userInfo: any) {
      // 1.创建新的用户
      await newUserData(userInfo)
      // 2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(id: number, userInfo: any) {
      // 更新用户的数据
      await editUserData(id, userInfo)
      // 重新请求数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    /* 针对页面的数据：增删改查 */
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: number) {
      await deletePageById(pageName, id)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      await newPageData(pageName, pageInfo)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      await editPageData(pageName, id, pageInfo)
      // 重新请求数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    }
  }
})
export default useSystemStore
