<template>
  <div class="pane-account">
    <el-form
      :model="account"
      :rules="accountRules"
      label-width="60px"
      size="large"
      status-icon
      ref="formRef"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import useLoginStore from '@/store/login/login'
import type { ElForm } from 'element-plus'
import type {IAccount} from '@/types'
import { localCache } from '@/utils/cache'
const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'
type FormInstance = InstanceType<typeof ElForm>
type FormRules = InstanceType<typeof ElForm>
// 1.定义account数据
const account = reactive<IAccount>({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})

// 2.定义校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入帐号信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20数字或字母组成~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
}

// 3.执行帐号的登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isRemPwd: boolean) {
  console.log('在子组件执行', account.name, account.password);
  formRef.value?.validate((valid: boolean)=>{
    if(valid){
      console.log('验证成功');
      const name = account.name
      const password = account.password
      loginStore.loginAccountAction({name, password}).then((res)=>{
        if(isRemPwd){
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        }else{
          localCache.deleteCache(CACHE_NAME)
          localCache.deleteCache(CACHE_PASSWORD)
        }
      })
    }else{
      ElMessage.error('Oops, this is a error message.')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.pane-account {
  color: red;
}
</style>
