<template>
  <el-dialog
    v-model="dialogVisible"
    :title="isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle"
    width="30%"
    center
  >
    <div class="form">
      <el-form :model="formData" label-width="80px" size="large">
        <template v-for="item in modalConfig.formItems" :key="item.prop">
          <el-form-item :label="item.label" :prop="item.prop">
            <template v-if="item.type === 'input'">
              <el-input v-model="formData[item.prop]" :placeholder="item.placeholder"></el-input>
            </template>
            <template v-if="item.type === 'date-picker'">
              <el-date-picker
                v-model="formData[item.prop]"
                type="daterange"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              ></el-date-picker>
            </template>
            <template v-if="item.type === 'select'">
              <el-select
                v-model="formData[item.prop]"
                :placeholder="item.placeholder"
                style="width: 100%"
              >
                <template v-for="option in item.options" :key="option.value">
                  <el-option :label="option.label" :value="option.value"></el-option>
                </template>
              </el-select>
            </template>
            <template v-if="item.type === 'custom'">
              <slot :name="item.slotName"></slot>
            </template>
          </el-form-item>
        </template>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirmClick"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
// import type { ImodalProps } from './type'
interface ImodalProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
}
const props = defineProps<ImodalProps>()
const initialData: any = {}
for (const item of props.modalConfig.formItems) {
  initialData[item.prop] = ''
}
const dialogVisible = ref(false)
const formData = reactive<any>(initialData)
const isNewRef = ref(true)
const editData = ref()
// 获取roles departments数据
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireDepartments } = storeToRefs(mainStore)
function setModalVisible(isNew: boolean = true, itemData?: any) {
  dialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    for (const key in formData) {
      const item = props.modalConfig.formItems.find((item) => item.prop === key)
      formData[key] = item ? item.initialValue : ''
    }
    editData.value = null
  }
}
// 点击了确定的逻辑
function handleConfirmClick() {
  dialogVisible.value = false
  let infoData = { ...formData }
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }
  if (!isNewRef.value && editData.value) {
    systemStore.editPageDataAction(props.modalConfig.pageName, editData.value.id, infoData)
  } else {
    systemStore.newPageDataAction(props.modalConfig.pageName, infoData)
  }
}
defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
