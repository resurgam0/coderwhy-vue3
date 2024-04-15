<template>
  <div class="user">
    <UserSearch @resetClick="resetClick" @queryClick="queryClick"/>
    <UserContent ref="contentRef" @newBtnClick="newBtnClick" @editClick="editClick"/>
    <UserModal ref="modalRef"/>
  </div>
</template>

<script setup lang="ts">
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserModal from './c-cpns/user-model.vue'
import {ref} from 'vue'
// 对content组件的操作
const contentRef = ref<InstanceType<typeof UserContent>>()
function queryClick(formData: any){
  contentRef.value?.fetchUserListData(formData)
}

function resetClick(){
  contentRef.value?.fetchUserListData()
}
const modalRef = ref<InstanceType<typeof UserModal>>()
// 对model组件的操作
function newBtnClick(){
  modalRef.value?.setModalVisible()
}
// 编辑用户
function editClick(itemData: any){
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style lang="less" scoped>
.user{
  border-radius: 20px;
  overflow: hidden;
}
</style>
