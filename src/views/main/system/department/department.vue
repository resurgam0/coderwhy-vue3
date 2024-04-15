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
      <template #leader="scope">{{ scope.row[scope.prop] }}</template>
      <template #parent="scope"> {{ scope.row[scope.prop] }} </template>
    </PageContent>
    <PageModal ref="modalRef" :modalConfig="modalConfigRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import { ref, computed } from 'vue'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import useMainStore from '@/store/main/main'

// 对modalConfig进行操作
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options.push(...departments)
    }
  })
  return modalConfig
})
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleNewClick, handleEditClick } = usePageModal()
</script>
