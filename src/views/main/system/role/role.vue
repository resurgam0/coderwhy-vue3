<template>
  <div class="department">
    <PageSearch
      :searchConfig="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <PageContent
      ref="contentRef"
      :contentConfig="contentConfig"
      @new-btn-click="handleNewClick"
      @edit-click="handleEditClick"
    >
    </PageContent>
    <PageModal ref="modalRef" :modalConfig="modalConfig" :otherInfo="otherInfo">
      <template #menulist>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
        >
        </el-tree>
      </template>
    </PageModal>
  </div>
</template>

<script setup lang="ts" name="department">
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'
import { ref, nextTick } from 'vue'
import type { ElTree } from 'element-plus'
import { mapMenuListToIds } from '@/utils/map-menus'
const treeRef = ref<InstanceType<typeof ElTree>>()
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)
const otherInfo = ref({})
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleNewClick, handleEditClick } = usePageModal(newCallback, editCallback)
function handleElTreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}
function newCallback(){
  nextTick(()=>{
    treeRef.value?.setCheckedKeys([])
  })
}
function editCallback(itemData: any) {
  nextTick(() => {
    const menuIds = mapMenuListToIds(itemData.menuList)
    treeRef.value?.setCheckedKeys(menuIds)
  })
}
</script>
