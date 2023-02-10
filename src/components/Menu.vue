<template>
    <!-- default-active设置默认选择首页的路径,:router="true"开启关联 -->
    <el-menu default-active="/home" :router="true" class="el" active-text-color="#d23918" text-color="black">
        <!-- item代表菜单,index代表索引 -->
        <template v-for="(item1, index1) in $router.options.routes" :item1="item1" :index="index">
            <!-- 有二级节点-->
            <el-sub-menu v-if="item1.meta.show && item1.children?.length > 0 " :index="item1.path">
                <template #title>
                    <!-- <el-icon>
                        <location />
                    </el-icon> -->
                    <component :is="item1.meta.icon" class="is"></component>
                    <span>{{ item1.meta.title }}</span>
                </template>
                <template v-for="(item2, index2) in item1.children">
                    <el-menu-item class="el" v-if="item2.meta.show" :index="item2.path">
                        <!-- <el-icon><List /></el-icon> -->
                        <!-- <component :is="item2.meta.icon" class="is"></component> -->
                        {{ item2.meta.title }}
                    </el-menu-item>
                </template>

            </el-sub-menu>

            <!-- 只有一级节点 -->
            <el-menu-item v-if="item1.meta.show && item1.children == null" :index="item1.path">
                <!-- <el-icon>
                    <icon-menu />
                </el-icon> -->
                <component :is="item1.meta.icon" class="is"></component>
                <span>{{ item1.meta.title }}</span>
            </el-menu-item>
        </template>

    </el-menu>

</template>
<script setup lang="ts">
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
</script>
<style scoped>
.el {
    background-color: #d9ecff;
}

.is {
    width: 16px;
    height: 16px;
    padding-right: 5px;
}
</style>
