<template>
  <div id="div1" v-if="$route.meta.useFrame">
    <div class="common-layout">
      <el-container>
        <el-header>
          <el-row :gutter="20">
            <el-col :span="4">
              <img src="/images/logo.png" class="logo" alt="管理系统" />
              <!-- <div class="grid-content ep-bg-purple" /> -->
            </el-col>
            <el-col :span="16" class="col1">
              后台管理系统
              <!-- <div class="grid-content ep-bg-purple" /> -->
            </el-col>
            <el-col :span="4">
              <el-dropdown>
                <span class="el-dropdown-link">
                  <el-icon>
                    <UserFilled />
                  </el-icon>{{userInfo.username}}
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>菜单一</el-dropdown-item>
                    <el-dropdown-item>菜单二</el-dropdown-item>
                    <el-dropdown-item>菜单三</el-dropdown-item>
                    <el-dropdown-item divided @click="logout">退出系统</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <!-- <div class="grid-content ep-bg-purple" /> -->
            </el-col>
          </el-row>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <Menu></Menu>
          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>

  <div id="div2" v-if="!$route.meta.useFrame">
    <router-view></router-view>
  </div>

  <!-- <router-link to="/home">首页</router-link><br />
  <router-link to="/teacher/list">商品列表</router-link><br />
  <router-link to="/teacher/create">添加商品</router-link><br />
  <hr />
  <router-view></router-view> -->
</template>

<script setup lang="ts">
import Menu from "@/components/Menu.vue"
//导入路由
import{RouterView, useRoute,useRouter} from 'vue-router'
import {appStore} from "@/store/appStore"
import { storeToRefs } from 'pinia';
import { UserFilled, ArrowDown } from "@element-plus/icons-vue";
import { ElContainer, ElHeader, ElRow, ElCol, ElDropdown, ElIcon, ElDropdownMenu, ElDropdownItem, ElAside, ElMain } from "element-plus";
import { onMounted } from "vue";
let {userInfo} = storeToRefs(appStore());
// 当前路由
const route=useRoute()
// 路由管理器
const router=useRouter()

// 点击时间，退出系统，跳转登录页面
const logout=()=>{
  userInfo.value.username="游客"
  userInfo.value.token=""
  router.push({name:"login"})
}


// onMounted(() => {
  
//   // 接收登录成功的消息事件
//   PubSub.subscribe('login-ok', (topic: string, data: any) => {
//     // console.log(topic,data);
//     let token = data;
//     //解析token(JWT数据结构)
//     //存入本地存储
//     userInfo.value.token = token
//   })
// })

</script>

<style scoped>
.el-row {
  align-items: center;
  vertical-align: middle;
  padding-top: 10px;
}

.el-header {
  background-color: #337ecc;
}

.logo {
  width: 40px;
  height: 40px;
  text-align: left;
}

.col1 {
  color: white;
}

.userinfo {
  text-align: right;
}

.el-dropdown-link {
  color: white;
}
</style>
