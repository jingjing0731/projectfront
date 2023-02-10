<template>
    <el-descriptions column="5">
        <el-descriptions-item label="批次编号">{{ batchinfo.id }} </el-descriptions-item>
        <el-descriptions-item label="批次名称">{{ batchinfo.batch_name }} </el-descriptions-item>
        <el-descriptions-item label="所属校区">{{ batchinfo.area_name }}</el-descriptions-item>
        <el-descriptions-item label="过期时间">{{ batchinfo.expire_time }}</el-descriptions-item>
        <el-descriptions-item label="批次状态">{{ batchinfo.expire_status }} </el-descriptions-item>
        <el-descriptions-item label="兑换链接">{{ batchinfo.exchange_link }}</el-descriptions-item>
    </el-descriptions>

    <el-descriptions column="6">
        <el-descriptions-item label="兑换码总数">{{ num.total }} </el-descriptions-item>
        <el-descriptions-item label="已分配总数">{{ num.divide_total }} </el-descriptions-item>
        <el-descriptions-item label="未分配总数">{{ num.not_divide_total }}</el-descriptions-item>
        <el-descriptions-item label="已使用总数">{{ num.used_total }}</el-descriptions-item>
        <el-descriptions-item label="未使用总数">{{ num.free_total }} </el-descriptions-item>
        <el-descriptions-item>
        <el-button v-if="route.name==='batch-info'" type="primary"  @click="handleDivide">分配兑换码</el-button>
        </el-descriptions-item>
        <el-descriptions-item label="已分配未使用详情:">
            <el-space wrap>
            <div v-for="(value, key) in num.detail">
                <el-button text> {{ key }} : {{ value }} </el-button>
            </div>
        </el-space>
        </el-descriptions-item>
    </el-descriptions>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import batchAPI from '@/api/batchAPI';
import router from '@/router';
import { useRoute } from 'vue-router';
import codeAPI from '@/api/codeAPI';
const route = useRoute()
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const tableData: any = ref([])
const batchinfo = reactive({
    id: "",
    batch_name: '',
    exchange_link: '',
    area_name: '',
    expire_time: "",
    expire_status: "",
    area_id:"",
})
const num = reactive({
    total: 0,
    divide_total: 0,
    not_divide_total: 0,
    used_total: 0,
    free_total: 0,
    detail: {},

})

const show_divide=0

onMounted(() => {
    callGetOneBatchApi()
    callGetNumApi()
})


const callGetOneBatchApi = () => {
    batchAPI.get_one.call({ id: route.query.id }).then((res: any) => {
        console.log(route.query.id)
        console.log(res)
        batchinfo.id = res.id
        batchinfo.batch_name = res.batch_name
        batchinfo.exchange_link = res.exchange_link
        batchinfo.area_name = res.area_name
        batchinfo.expire_time = res.expire_time
        batchinfo.expire_status = res.expire_status
        batchinfo.area_id=res.area_id
    })
}

const callGetNumApi = () => {
    codeAPI.get_num.call({ batch: route.query.id }).then((res: any) => {
        num.total = res.total
        num.divide_total = res.divide_total
        num.not_divide_total = res.not_divide_total
        num.free_total = res.free_total
        num.used_total = res.used_total
        num.detail = res.detail
    })
}
// 点击跳转分配兑换码页面
const handleDivide = (index: number, row: any) => {
    router.push({ name: "batch-divide-code", query: { id: route.query.id ,area:batchinfo.area_id} })

}

</script>
