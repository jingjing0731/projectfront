<template>
    新增批次
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
                <el-option v-for="item in area_id_options" :label="item.area_name" :value="item.id" :key="item.id" />
            </el-select>
        </el-form-item>

        <el-form-item label="过期时间" prop="expire_time">
            <el-date-picker v-model="ruleForm.expire_time" type="date" placeholder="请选择过期时间" format="YYYY/MM/DD"
                value-format="YYYY-MM-DD">
            </el-date-picker>
        </el-form-item>

        <el-form-item label="批次兑换码文件" prop="fileList">
            <!-- <el-upload class="upload" drag action="" accept:=".xls,.xlsx " :limit="1" :auto-upload="false" :http-request="handleUpload"
                ref="upload" :http-request="httpRequest" :file-list="filelist" > -->
            <el-upload class="upload" drag accept:=".xls,.xlsx " :on-change="handleChange" :show-file-list="true"
                :limit="1" :auto-upload="false">
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    拖拽文件到这里 <em>点击上传</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                        仅支持xls/xlsx格式文件
                    </div>
                </template>
            </el-upload>
        </el-form-item>
        <el-form-item>

            <el-button type="primary" @click="submitForm(ruleFormRef)">
                新增批次
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import AreaAPI from '@/api/areaAPI';
import BatchAPI from '@/api/BatchAPI';
import router from '@/router';
import batchAPI from '@/api/BatchAPI';

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    batch_name: '',
    exchange_link: '',
    area_id: '',
    expire_time: "",
    code_file: "",
})
const fileList = ref('')
//存放上传文件
const area_id_options = ref([])

const handleChange = (uploadFile: any, uploadFiles: any) => {
    fileList.value = uploadFile.raw
}

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
    ],
    code_file: [
        {
            required: true, message: '兑换码文件不能为空', trigger: 'change',
        },
    ],
})


// 提交功能
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            callBatchApi()
        } else {
            console.log('新增批次失败!', fields)
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
})
// 加载selete框调用后段接口
const callAreaApi = () => {
    AreaAPI.select.call({}).then((res: any) => {
        area_id_options.value = res.results
    })
}

// 调用新增批次的接口
const callBatchApi = () => {
    let formData = new FormData()
    formData.append("batch_name", ruleForm.batch_name)
    formData.append("area_id", ruleForm.area_id)
    formData.append("exchange_link", ruleForm.exchange_link)
    formData.append("expire_time", ruleForm.expire_time)
    console.log(fileList.value)
    formData.append("code_file", fileList.value)


    BatchAPI.insert.call(formData).then((res: any) => {
        if (undefined != res) {
            ElMessage({ message: '新增批次成功', type: 'success', })
            //新建成功跳转路由
            router.push({ name: "batch-list" })
        } else {
            console.error('新建批次失败')
        }
    })
}


</script>




