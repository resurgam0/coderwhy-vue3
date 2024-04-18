<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUserClick">{{
        contentConfig?.header?.btnTitle ?? '新建数据'
      }}</el-button>
    </div>
    <div class="table">
      <div class="table">
        <el-table :data="pageList" border style="width: 100%" v-bind="contentConfig.childrenTree">
          <template v-for="item in contentConfig.propsList" :key="item.prop">
            <template v-if="item.type === 'timer'">
              <el-table-column align="center" v-bind="item">
                <template #default="scope">
                  {{ formatUTC(scope.row[item.prop]) }}
                </template>
              </el-table-column>
            </template>
            <template v-else-if="item.type === 'handler'">
              <el-table-column align="center" v-bind="item">
                <template #default="scope">
                  <el-button
                    v-if="isUpdate"
                    size="small"
                    icon="Edit"
                    type="primary"
                    text
                    @click="handleEditBtnClick(scope.row)"
                  >
                    编辑
                  </el-button>
                  <el-button
                    v-if="isDelete"
                    size="small"
                    icon="Delete"
                    type="danger"
                    text
                    @click="handleDeleteBtnClick(scope.row.id)"
                  >
                    删除
                  </el-button></template
                >
              </el-table-column>
            </template>
            <template v-else-if="item.type === 'custom'">
              <el-table-column align="center" v-bind="item">
                <template #default="scope">
                  <slot :name="item.slotName" v-bind="scope" :prop="item.prop"></slot>
                </template>
              </el-table-column>
            </template>
            <template v-else>
              <el-table-column align="center" v-bind="item" />
            </template>
          </template>
        </el-table>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="sizes, prev, pager, next, jumper, total"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'
import usePermissions from '@/hooks/usePermissions'
interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    childrenTree?: any
  }
}
const props = defineProps<IProps>()
// 定义事件
const emit = defineEmits(['newBtnClick', 'editClick'])
// 获取是否有对应的增删改查权限
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)
// 1.发起action请求usersList的数据
const systemStore = useSystemStore()
// 监听systemStore中的actions被执行
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === 'deletePageByIdAction' ||
      name === 'editPageDataAction' ||
      name === 'newPageDataAction'
    ) {
      currentPage.value = 1
    }
  })
})
const currentPage = ref(1)
const pageSize = ref(10)
fetchPageListData()
// 2.获取usersList数据，进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)
// 3.页码相关的逻辑

function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}

// 定义函数，用于发送网络请求
function fetchPageListData(formData: any = {}) {
  if (!isQuery) return
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  const queryInfo = { ...formData, ...pageInfo }
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}
// 删除
function handleDeleteBtnClick(id: number) {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
}
// 新建用户
function handleNewUserClick() {
  emit('newBtnClick')
}
// 编辑
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}

defineExpose({ fetchPageListData })
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 15px;
  background-color: #fff;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
  .title {
    font-size: 22px;
  }
}
.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
