<template>
    新增老师
    [初始化密码:123456]
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
        :size="formSize" status-icon>
        <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username" placeholder="请输入用户名" />
        </el-form-item>

        <el-form-item label="手机号" prop="phone_num">
            <el-input v-model="ruleForm.phone_num" placeholder="请输入手机号" />
        </el-form-item>

        <el-form-item label="所属校区" prop="area">
            <el-select v-model="ruleForm.area" placeholder="请选择所属校区">
                <el-option v-for="item in area_options" :label="item.area_name" :value="item.id" :key="item.id" />
            </el-select>
        </el-form-item>

        <el-form-item label="所属分校" prop="school">
            <el-select v-model="ruleForm.school" placeholder="请选择所属分校">
                <el-option v-for="item in school_options" :label="item.school_name" :value="item.id" :key="item.id" />
            </el-select>
        </el-form-item>


        <el-form-item label="是否是主管" prop="is_staff">
            <el-radio-group v-model="ruleForm.is_staff">
                <el-radio :label="1"> 是 </el-radio>
                <el-radio :label="0"> 否 </el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="是否在职" prop="is_active">
            <el-radio-group v-model="ruleForm.is_active">
                <el-radio :label="1"> 是 </el-radio>
                <el-radio :label="0"> 否 </el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
                新增老师
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import areaAPI from '@/api/areaAPI';
import schoolAPI from '@/api/schoolAPI';
import teacherAPI from '@/api/teacherAPI';
import router from '@/router';

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    username: '',
    phone_num: '',
    area: '',
    school: '',
    is_staff: 0,
    is_active: 0,
})
const area_options = ref([])
const school_options = ref([])

const rules = reactive<FormRules>({
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
        { min: 2, max: 10, message: '用户名长度为2-10个字符', trigger: 'blur' },
    ],
    phone_num: [
        { required: true, message: '手机号不能为空', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
    ],
    area: [
        {
            required: true, message: '所属校区不能为空', trigger: 'change',
        },
    ],
    school: [
        {
            required: true, message: '所属分校不能为空', trigger: 'change',
        },
    ],
    is_staff: [
        {
            required: true, message: '是否是主管不能为空', trigger: 'change',
        },
    ],
    is_active: [
        {
            required: true, message: '是否在职不能为空', trigger: 'change',
        },
    ],
})

// 提交功能
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            callTeacherApi()
        } else {
            console.log('新增老师失败!', fields)
        }
    })
}

// 重置
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

// 进入页面后加载两个select框
onMounted(() => {
    // callApi();
    // setTimeout(() => {
        callAreaApi()
    // }, 500)
    // setTimeout(() => {
        callSchoolApi()
    // }, 500)
})
// 两个加载selete框调用后段接口
const callAreaApi = () => {
    areaAPI.select.call({}).then((res: any) => {
        area_options.value = res.results

        // 默认显示
        // ruleForm.area = res.results[0].area_name
    })
}
const callSchoolApi = () => {
    schoolAPI.select.call({}).then((res: any) => {
        school_options.value = res.results

        // 默认显示
        // ruleForm.school = res.results[0].school_name
    })
}
// 调用新增老师的接口
const callTeacherApi = () => {
    // teacherAPI.insert.call({ username: ruleForm.username, phone_num_num: ruleForm.phone_num, area: ruleForm.area, school: ruleForm.school, is_staff: ruleForm.is_staff, is_active: ruleForm.is_active }).then((res: any) => {
        teacherAPI.insert.call( ruleForm ).then((res: any) => {
        console.log("xinzenglaoshi",res)
        if (undefined != res) {
            ElMessage({ message: '新增老师成功', type: 'success', })
            //登录成功跳转路由
            router.push({ name: "teacher-list" })
        }
    })
}


</script>
