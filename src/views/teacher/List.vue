<template>
  老师列表页
  <el-form :inline="true">
    <el-form-item label="用户名">
      <el-input v-model="formData.username" placeholder="请输入关键字">
      </el-input>
    </el-form-item>
    <el-form-item label="手机号">
      <el-input v-model="formData.phone" placeholder="请输入关键字">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="tableData" border height="460" style="width: 100%">
    <el-table-column prop="id" label="ID" width="60" />
    <el-table-column prop="username" label="用户名" width="150" />
    <el-table-column prop="phone_num" label="手机号" width="150" />
    <el-table-column prop="area_name" label="所属区域" />
    <el-table-column prop="school_name" label="所属校区" />
    <el-table-column prop="is_staff" label="是否是主管" width="120" :formatter="formatter" />
    <el-table-column prop="is_active" label="是否在职"  width="120" :formatter="formatter" />
    <el-table-column label="操作" align="center">
      <template #default="scope">
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
import teacherAPI from '@/api/teacherAPI'
import { ElForm, ElFormItem, ElInput, ElButton, ElTable, ElTableColumn, ElMessage } from 'element-plus';
import router from '@/router';
//定义tableData
const tableData: any = ref([])

//转换是否是主管/在职的文案，将前端返回的true/false转换为文字
const formatter = (row: any, column: any, cellValue: any, index: any) => {
  return cellValue ? "是" : "否"
}

// 搜索框
const formData = reactive({
  username: '',
  phone: "",
})

//分页
const paginationData = reactive({
  pageSize: 10,
  pageNum: 1,
  total: 0
})
const pageChange = (pageNum: number) => {
  paginationData.pageNum = pageNum
  callTeacherTableApi()
}

onMounted(() => {
  callTeacherTableApi()
})

// 查询老师
const callTeacherTableApi = () => {
  //因为在http/index.ts中对响应的数据已经处理过了
  let username = formData.username === "" ? undefined : formData.username;
  let phone = formData.phone === "" ? undefined : formData.phone;
  let pageSize = paginationData.pageSize
  let pageNum = paginationData.pageNum
  teacherAPI.select.call({ username: username, phone: phone, page: pageNum }).then((res: any) => {
    tableData.value = res.results
    paginationData.total = res.count
  })
}
// 查询
const onSubmit = () => {
  paginationData.pageNum = 1
  callTeacherTableApi();
}
//点击删除事件
const handleDelete = (index: number, row: any) => {
  teacherAPI.delete.call({ id: row.id }).then((res: any) => {
    console.log(undefined === res)
    console.log(res)
    console.log(res === undefined)

    if (undefined != res) {
      ElMessage.success("删除成功")

    }
    callTeacherTableApi();
  })
}
// 点击跳转编辑页面
const handleEdit = (index: number, row: any) => {
  router.push({ name: "teacher-edit", query: { id: row.id } })

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
