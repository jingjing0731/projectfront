<template>
    批次列表页
    <el-form :inline="true">
        <el-form-item label="批次编号">
            <el-input v-model="formData.id" placeholder="请输入批次名称">
            </el-input>
        </el-form-item>
        <el-form-item label="批次名称">
            <el-input v-model="formData.batch_name" placeholder="请输入批次名称">
            </el-input>
        </el-form-item>
        <el-form-item label="批次状态">
            <el-select v-model="formData.expire_status" clearable placeholder="请选择批次状态">
                <el-option v-for="item in expire_status_options" :key="item.value" :label="item.label"
                    :value="item.value" />
            </el-select>
        </el-form-item>

        <el-form-item :inline="true">
            <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
    </el-form>

    <el-table :data="tableData" border height="400" style="width: 100%">
        <el-table-column fixed prop="id" label="ID" width="50" />
        <el-table-column fixed prop="batch_name" label="批次名称" width="150" />
        <el-table-column fixed prop="exchange_link" label="兑换链接" width="250" />
        <el-table-column prop="expire_time" label="过期时间" format="YYYY/MM/DD" />
        <el-table-column prop="expire_status" label="批次状态" width="100"  />
        <el-table-column prop="area_name" label="所属校区" width="100" />
        <!-- <el-table-column prop="create_user" label="创建人" width="120" />
        <el-table-column prop="create_time" label="创建时间" width="120" /> -->
        <el-table-column label="操作" align="center" fixed="right" width="350">
            <template #default="scope">
                <el-button size="small" type="success" @click="handleObtainCode(scope.$index, scope.row)">获取兑换码</el-button>
                <el-button size="small" type="primary" @click="handleInfo(scope.$index, scope.row)">查看详情</el-button>
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <div class="example-pagination-block">
        <div class="example-demonstration"></div>
        <el-pagination layout="prev, pager, next" :total="paginationData.total" :page-size="paginationData.pageSize"
            :current-page="paginationData.pageNum" @current-change="pageChange" />
    </div>

</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
//导入productApi
import BatchAPI from '@/api/BatchAPI'
import { ElForm, ElFormItem, ElInput, ElButton, ElTable, ElTableColumn, ElMessage } from 'element-plus';
import router from '@/router';
//定义tableData
const tableData: any = ref([])

// 搜索框
const formData = reactive({
    id: '',
    batch_name: '',
    expire_status: "",
})

const expire_status_options = [
    { value: '1', label: '正常', },
    { value: '2', label: '已过期', },
    { value: '0', label: '全部', },
]
//分页
const paginationData = reactive({
    pageSize: 10,
    pageNum: 1,
    total: 0
})
const pageChange = (pageNum: number) => {
    paginationData.pageNum = pageNum
    callBatchTableApi()
}

// 查询
onMounted(() => {
    callBatchTableApi()
})

const onSubmit = () => {
    paginationData.pageNum = 1
    callBatchTableApi();
}

// 查询批次
const callBatchTableApi = () => {
    //因为在http/index.ts中对响应的数据已经处理过了
    let id = formData.id === "" ? undefined : formData.id;
    let batch_name = formData.batch_name === "" ? undefined : formData.batch_name;
    let expire_status = formData.expire_status === "" ? undefined : formData.expire_status;
    let pageSize = paginationData.pageSize
    let pageNum = paginationData.pageNum
    BatchAPI.select.call({ id: id, batch_name: batch_name, expire_status: expire_status, page: pageNum }).then((res: any) => {
        tableData.value = res.results
        paginationData.total = res.count
    })
}


//点击删除事件
const handleDelete = (index: number, row: any) => {
    BatchAPI.delete.call({ id: row.id }).then((res: any) => {
        console.log(undefined === res)
        console.log(res)
        console.log(res === undefined)

        if (undefined != res) {
            ElMessage.success("删除成功")

        }
        callBatchTableApi();
    })
}
// 点击跳转编辑页面
const handleEdit = (index: number, row: any) => {
    router.push({ name: "batch-edit", query: { id: row.id } })

}
// 点击跳转详情页面
const handleInfo = (index: number, row: any) => {
    router.push({ name: "batch-info", query: { id: row.id } })

}
// 点击跳转获取兑换码页面
const handleObtainCode = (index: number, row: any) => {
    router.push({ name: "batch-obtain-code", query: { id: row.id } })

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
