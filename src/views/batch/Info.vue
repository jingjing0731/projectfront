<template>
    批次信息
    <BatchInfo></BatchInfo>

    <el-table :data="tableData" border height="400" style="width: 90%">
        <el-table-column fixed prop="code_name" label="兑换码" />
        <el-table-column fixed prop="school_name" label="学校" />
        <el-table-column fixed prop="student_name" label="学生姓名" />
        <el-table-column prop="student_grade" label="年级" />
        <el-table-column prop="student_major" label="专业" />
        <el-table-column prop="operator_user" label="操作人" />
        <el-table-column prop="operator_time" label="操作时间" width="180" />
    </el-table>

    <div class="example-pagination-block">
        <div class="example-demonstration"></div>
        <el-pagination layout="prev, pager, next" :total="paginationData.total" :page-size="paginationData.pageSize"
            :current-page="paginationData.pageNum" @current-change="pageChange" />
    </div>
</template>

<script lang="ts" setup>
import BatchInfo from '@/views/batch/BatchInfo.vue'
import { onMounted, reactive, ref } from 'vue'
import batchAPI from '@/api/batchAPI';
import router from '@/router';
import { useRoute } from 'vue-router';
import codeAPI from '@/api/codeAPI';
const route = useRoute()
const tableData: any = ref([])


onMounted(() => {
    callGetUsedCodeApi()
})
//分页
const paginationData = reactive({
    pageSize: 10,
    pageNum: 1,
    total: 0
})
const pageChange = (pageNum: number) => {
    paginationData.pageNum = pageNum
    callGetUsedCodeApi()
}

const callGetUsedCodeApi = () => {
    let pageNum = paginationData.pageNum
    codeAPI.select_used.call({ status: 2, batch: route.query.id, page: pageNum }).then((res: any) => {
        tableData.value = res.results
        paginationData.total = res.count
    })
}


</script>

<style>
.example-pagination-block+.example-pagination-block {
    margin-top: 10px;
}

.example-pagination-block .example-demonstration {
    margin-bottom: 16px;
}
</style>



