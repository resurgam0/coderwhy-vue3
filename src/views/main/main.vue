<template>
  <div class="main">
    <!-- <button @click="handleExitClick">退出登录</button> -->
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <mainMenu :isCollapse="isCollapse"/>
      </el-aside>
      <el-container>
        <el-header>
          <mainHeader @foldChange="handleFoldChange"/>
        </el-header>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'
import {ref} from 'vue'
import { localCache } from '@/utils/cache'
import mainMenu from '@/components/main-menu/main-menu.vue'
import mainHeader from '@/components/main-header/main-header.vue'
function handleExitClick() {
  // 删除token
  // 跳回到login页面
  localCache.deleteCache(LOGIN_TOKEN)
  router.push('/login')
}
const isCollapse = ref(false)
// 处理main-header中折叠的变化
function handleFoldChange(isFold: boolean){
  isCollapse.value = isFold
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
}

.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    transition: width 0.3s ease;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
