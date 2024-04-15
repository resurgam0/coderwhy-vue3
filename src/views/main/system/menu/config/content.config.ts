const contentConfig = {
  pageName: 'menu',
  header: {
    title: '菜单列表',
    btnTitle: '新建菜单'
  },
  propsList: [
    { label: '菜单名称', prop: 'name', width: '180px' },
    { label: '级别', prop: 'type', width: '150px' },
    { label: '菜单url', prop: 'url', width: '150px' },
    { label: '菜单icon', prop: 'icon', width: '150px' },
    { label: '排序', prop: 'sort', width: '150px' },
    { label: '权限', prop: 'permission', width: '150px' },
    { type: 'timer', label: '创建时间', prop: 'createAt', width: '150px' },
    { type: 'timer', label: '更新时间', prop: 'updateAt', width: '150px' },
    { type: 'handler', label: '操作' }
  ],
  childrenTree:{
    rowKey: 'id',
    treeProps:{
      children: 'children'
    }
  }
}
export default contentConfig