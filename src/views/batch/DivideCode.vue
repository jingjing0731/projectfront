<template>
    分配批次
    <BatchInfo></BatchInfo>
    【注：各分校分配数之和应小于等于"未使用总数"】
    <el-form ref="formRef" :model="dynamicValidateForm" label-width="120px" class="demo-dynamic">
        <el-form-item v-for="(domain, index) in dynamicValidateForm.nums" :key="domain.id" :label="domain.school_name"
            :prop="'nums.' + index + '.value'" :rules="[{
                required: true,
                message: '分配数量不能为空',
                trigger: 'blur',
            },
            {
                type: 'number',
                message: '请填入数字',
                trigger: ['blur', 'change'],
            },]">
            <el-input v-model.number="domain.value" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(formRef)">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import BatchInfo from '@/views/batch/BatchInfo.vue'
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import schoolAPI from '@/api/schoolAPI';
import { useRoute } from 'vue-router';
import batchAPI from '@/api/BatchAPI';
import codeAPI from '@/api/codeAPI';
import router from '@/router';

const route = useRoute()
const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<{
    nums: DomainItem[]
}>({
    nums: [
        {
            id: 0,
            school_name: "",
            area: "",
            value: 0
        },
    ],
})

interface DomainItem {
    id: number
    school_name: string,
    area: string,
    value: number
}


const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            callDivideCodeApi()
        } else {
            console.log('error submit!')
            return false
        }
    })
}

onMounted(() => {
    callSchoolApi()
})

const callSchoolApi = () => {
    schoolAPI.get_schools_from_area.call({ area: route.query.area }).then((res: any) => {
        dynamicValidateForm.nums=res
        console.log("jkdsnfk", dynamicValidateForm.nums)

    })
}

const callDivideCodeApi = () => {
    let shcool_num={}
    for (let i=0;i<dynamicValidateForm.nums.length; i++ ) {
        shcool_num[dynamicValidateForm.nums[i].id]=dynamicValidateForm.nums[i].value
    }
    codeAPI.divide_code.call({batch_id:route.query.id,shcool_num:shcool_num}).then((res: any) => {
        console.log("fsadfa",res)
        if (undefined != res) {
            ElMessage({ message: '分配成功', type: 'success', })
            //新建成功跳转路由
            router.push({ name: "batch-info" ,query: { id: route.query.id }})
        } else {
            console.error('分配兑换码失败!')
        }
    })
}
</script>
