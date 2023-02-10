<template>
    编辑批次信息
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="140px" class="demo-ruleForm"
        :size="formSize" status-icon>
        <el-form-item label="批次名" prop="batch_name">
            <el-input v-model="ruleForm.batch_name" placeholder="请输入批次名" />
        </el-form-item>

        <el-form-item label="兑换链接" prop="exchange_link">
            <el-input v-model="ruleForm.exchange_link" placeholder="请输入兑换链接" />
        </el-form-item>

        <el-form-item label="所属校区" prop="area_id">
            <el-select v-model="ruleForm.area_id" placeholder="请选择所属校区">
                <el-option v-for="item in area_options" :label="item.area_name" :value="item.id" :key="item.id" />
            </el-select>
        </el-form-item>

        <el-form-item label="过期时间" prop="expire_time">
            <el-date-picker v-model="ruleForm.expire_time" type="date" placeholder="请选择过期时间" format="YYYY/MM/DD"
                value-format="YYYY-MM-DD" />
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">提交修改</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import areaAPI from '@/api/areaAPI';
import batchAPI from '@/api/batchAPI';
import router from '@/router';
import { useRoute } from 'vue-router';
const route = useRoute()
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    id:"",
    batch_name: '',
    exchange_link: '',
    area_id: '',
    expire_time: "",
})
const area_options = ref([])
const rules = reactive<FormRules>({
    batch_name: [
        { required: true, message: '批次名不能为空', trigger: 'blur' },
        { min: 2, max: 50, message: '批次名长度为2-50个字符', trigger: 'blur' },
    ],
    exchange_link: [
        { required: true, message: '兑换链接不能为空', trigger: 'blur' },
        { min: 2, max: 255, message: '兑换链接为2-255个字符', trigger: 'blur' },

    ],
    area_id: [
        {
            required: true, message: '所属校区不能为空', trigger: 'change',
        },
    ],
    expire_time: [
        {
            required: true, message: '过期时间不能为空', trigger: 'change',
        },
    ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            callBatchApi()
        } else {
            console.log('修改批次失败!', fields)
        }
    })
}

// 重置
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

// 进入页面后加载select框
onMounted(() => {
    callAreaApi()
    callSelectBatchApi()
})
// 加载selete框调用后段接口
const callAreaApi = () => {
    areaAPI.select.call({}).then((res: any) => {
        area_options.value = res.results
    })
}

// 调用新增批次的接口
const callBatchApi = () => {

    console.log("aaaa",ruleForm)
    batchAPI.update.call(ruleForm).then((res: any) => {
        if (undefined != res) {
            ElMessage({ message: '修改批次成功', type: 'success', })
            //新建成功跳转路由
            router.push({ name: "batch-list" })
        } else {
            console.error('修改批次失败')
        }
    })
}

const callSelectBatchApi = () => {

batchAPI.select.call({id: route.query.id} ).then((res: any) => {
    if (undefined != res) {
            ruleForm.batch_name = res.results[0].batch_name
            ruleForm.exchange_link = res.results[0].exchange_link
            // console.log("aaa",area_options.value[0])
            // ruleForm.area = area_options.value[0]
            // ruleForm.school = res.results[0].school_name
            ruleForm.expire_time = res.results[0].expire_time
            ruleForm.id=res.results[0].id

        }
})
}


</script>




