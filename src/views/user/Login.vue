<template>
    <div class="loginWapper">

        <el-row justify="center" align="middle" style="height:90vh">
            <el-col :span="8">
                <el-card class="box-card">
                    <template #header>
                        <div class="card-header">
                            <span>后台管理系统</span>
                        </div>
                    </template>
                    <!-- ref="ruleFormRef" 引用表单校验 -->
                    <!-- :rules="rules"绑定校验 -->
                    <el-form :model="formData" label-width="80px" ref="ruleFormRef" :rules="rules">
                        <el-form-item label="用户名:" prop="username">
                            <el-input v-model="formData.username" placeholder="请输入用户名" />
                        </el-form-item>
                        <el-form-item label="密码:" prop="password">
                            <el-input type="password" v-model="formData.password" placeholder="请输入密码" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
                            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                        </el-form-item>
                    </el-form>

                </el-card>

            </el-col>
        </el-row>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FormInstance, FormRules, useTransitionFallthroughEmits } from 'element-plus'
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import { userAPI } from '@/api/Index';
import { appStore } from "@/store/appStore"
import { storeToRefs } from 'pinia';
let { userInfo } = storeToRefs(appStore());

const ruleFormRef = ref<FormInstance>()
const router = useRouter()

const formData = reactive({
    username: '',
    password: '',
})

const rules = reactive<FormRules>({
    username: [
        //不填提示
        { required: true, message: '请输入邮箱账号', trigger: 'blur' },
        //格式不对提示
        // { type: 'username', message: '邮箱格式不正确', trigger: ['blur', 'change'] },

    ],
    password: [
        //不填提示
        { required: true, message: '请输入密码', trigger: 'blur' },
        // 长度不够提示
        // { min: 6, max: 10, message: '长度必须是6到10位', trigger: 'blur' },
    ],
})
// 提交
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            //校验成功
            callApi()
        } else {
            //校验失败
            console.log('error submit!', fields)
        }
    })
}
// 重置
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
// 登录成功后调用的方法
const callApi = () => {
    userAPI.login.call({ username: formData.username, password: formData.password }).then((res: any) => {
        if (undefined != res) {
            // let token = res.access
            //生产者,发送消息
            // PubSub.publish('login-ok', token)
            userInfo.value.token="Bearer "+res.access
            userInfo.value.username = res.username
            ElMessage({ message: '登录成功', type: 'success', })
            //登录成功跳转路由
            router.push({ name: "home" })
        }
    })
}
</script>
 
<style scoped>
.loginWapper {
    background-color: aquamarine;
    width: 100%;
    height: 100%;
    position: fixed;
    background-size: 100% 100%;
}
</style>