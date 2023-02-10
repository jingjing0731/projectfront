<template>
    获取兑换码
    [重要！！！将兑换码发给学生后，请务必提交该页面内容！否则会导致兑换码状态错误，后续无法使用的问题！！！]
    <el-descriptions column="5">
        <el-descriptions-item label="批次编号">{{ batchinfo.id }} </el-descriptions-item>
        <el-descriptions-item label="批次名称">{{ batchinfo.batch_name }} </el-descriptions-item>
        <el-descriptions-item label="所属校区">{{ batchinfo.area_name }}</el-descriptions-item>
        <el-descriptions-item label="过期时间">{{ batchinfo.expire_time }}</el-descriptions-item>
        <el-descriptions-item label="批次状态">{{ batchinfo.expire_status }} </el-descriptions-item>
        <el-descriptions-item label="兑换链接">{{ batchinfo.exchange_link }}</el-descriptions-item>
    </el-descriptions>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
        :size="formSize" status-icon v-if="ruleForm.code_name">
        <el-form-item label="兑换码" prop="code_name">
            {{ ruleForm.code_name }}
        </el-form-item>

        <el-form-item label="学生姓名" prop="student_name">
            <el-input v-model="ruleForm.student_name" placeholder="请输入学生姓名" />
        </el-form-item>

        <el-form-item label="所在年级" prop="student_grade">
            <el-input v-model="ruleForm.student_grade" placeholder="请输入学生所在年级" />
        </el-form-item>

        <el-form-item label="学生专业" prop="student_major">
            <el-input v-model="ruleForm.student_major" placeholder="请输入学生所在专业" />
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
                提交
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
    </el-form>
    <div class="col1" >
        {{ruleForm.error}}
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import router from '@/router';
import batchAPI from '@/api/BatchAPI';
import { useRoute } from 'vue-router';
import codeAPI from '@/api/codeAPI';
import { storeToRefs } from 'pinia';
import { appStore } from '@/store/appStore';
import  {datatime} from '@/api/datatime'
let {userInfo} = storeToRefs(appStore());

const route = useRoute()


const batchinfo = reactive({
    id: "",
    batch_name: '',
    exchange_link: '',
    area_name: '',
    expire_time: "",
    expire_status: "",
})
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    id: "",
    code_name: "",
    student_name: '',
    student_grade: '',
    student_major: '',
    operator_user:"",
    operator_time:"",
    error:""
})

// 进入页面后获取batch信息，获取兑换码
onMounted(() => {
    callGetOneBatchApi()
    callGetCodeApi()
})
const callGetOneBatchApi = () => {
    batchAPI.get_one.call({ id: route.query.id }).then((res: any) => {
        batchinfo.id = res.id
        batchinfo.batch_name = res.batch_name
        batchinfo.exchange_link = res.exchange_link
        batchinfo.area_name = res.area_name
        batchinfo.expire_time = res.expire_time
        batchinfo.expire_status = res.expire_status
    })
}

const callGetCodeApi = () => {
    codeAPI.get_code.call({ batch: route.query.id }).then((res: any) => {
        ruleForm.id = res.id
        ruleForm.code_name = res.code
        ruleForm.error=res.error
        console.log("bbfsa",ruleForm.error)

    })
}

const rules = reactive<FormRules>({
    student_name: [
        { required: true, message: '学生姓名不能为空', trigger: 'blur' },
    ],
    student_grade: [
        { required: true, message: '学生所在年级不能为空', trigger: 'blur' },
    ],
    student_major: [
        { required: true, message: '学生所在专业不能为空', trigger: 'blur' },
    ],
})


// 提交功能
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            callUseCodeApi()
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


// 调用使用code的接口
const callUseCodeApi = () => {
    ruleForm.operator_user=userInfo.value.username
    console.log("11111",datatime())
    ruleForm.operator_time=datatime()
    codeAPI.use_code.call(ruleForm).then((res: any) => {

        if (undefined != res) {
            ElMessage({ message: '提交信息成功', type: 'success', })
            //提交成功跳转batch列表
            router.push({ name: "batch-list" })
        }
    })
}


</script>
<style>
.col1 {
  color: red;
}
</style>