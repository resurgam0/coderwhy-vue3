const searchConfig = {
  pageName: 'department',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '部门名称',
      placeholder: '请输入查询的部门名称',
      initialValue: 3
    },
    {
      type: 'input',
      prop: 'leader',
      label: '部门领导',
      placeholder: '请输入查询的部门领导'
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
    },
    {
      type: 'select',
      prop: 'enale',
      label: '状态',
      placeholder: '请选择查询的状态',
      options: [
        { label: '启动', value: 1 },
        { label: '禁用', value: 0 }
      ]
    }
  ]
}
export default searchConfig
