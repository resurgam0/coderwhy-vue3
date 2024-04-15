<template>
  <div class="search" v-if="isQuery">
    <el-form
      :model="searchForm"
      ref="formRef"
      :label-width="searchConfig.labelWidth ?? '80px'"
      size="large"
    >
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                ></el-date-picker>
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value"></el-option>
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 重置和搜索的按钮 -->
    <div class="btns">
      <el-button icon="Refresh" size="large" @click="handleResetClick">重置</el-button>
      <el-button icon="Search" type="primary" size="large" @click="handleSearchClick"
        >查询</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import usePermissions from '@/hooks/usePermissions'

// 定义自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])
interface IProps {
  searchConfig: {
    pageName: string
    labelWidth?: string
    formItems: any[]
  }
}
const props = defineProps<IProps>()
const isQuery = usePermissions(`${props.searchConfig.pageName}:query`)
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const searchForm = reactive(initialForm)
// 重置操作
const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  formRef.value?.resetFields()
  emit('resetClick')
}
function handleSearchClick() {
  emit('queryClick', searchForm)
}
</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  .el-form-item {
    padding: 20px;
    margin-bottom: 0;
  }
}
.btns {
  text-align: right;
  padding: 0 50px 10px 0;
  .el-button {
    height: 36px;
  }
}
</style>
