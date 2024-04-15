import { ref } from 'vue'
import type PageContent from '@/components/page-content/page-content.vue'
function usePageContent() {
  const contentRef = ref<InstanceType<typeof PageContent>>()
  function handleQueryClick(formData: any) {
    contentRef.value?.fetchPageListData(formData)
  }
  // 重置
  function handleResetClick() {
    contentRef.value?.fetchPageListData()
  }
  return {
    contentRef,
    handleQueryClick,
    handleResetClick
  }
}
export default usePageContent
