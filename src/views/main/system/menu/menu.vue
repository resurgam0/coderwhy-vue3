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
    <PageModal ref="modalRef" :modalConfig="modalConfig" />
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
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleNewClick, handleEditClick } = usePageModal()
</script>
