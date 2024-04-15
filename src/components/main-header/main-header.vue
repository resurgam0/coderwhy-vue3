<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleIconClick">
      <el-icon size="28px">
        <component :is="isFold ? 'Expand' : 'Fold'"></component>
      </el-icon>
    </div>
    <div class="content">
      <headerCrumb></headerCrumb>
      <header-info />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderInfo from './c-cpns/header-info.vue'
import headerCrumb from './c-cpns/header-crumb.vue';
const isFold = ref(false)
const emit = defineEmits(['foldChange'])
function handleIconClick() {
  // 内部改变状态
  isFold.value = !isFold.value
  // 将事件和状态传递给父组件
  emit('foldChange', isFold.value)
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
