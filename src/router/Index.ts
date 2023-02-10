import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { appStore } from "@/store/appStore"
import { storeToRefs } from 'pinia'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/home',
        name: 'home',
        component: () => import("@/views/Home.vue"),
        meta: { title: '首页', icon: "House", show: true, useFrame: true },
    },
    {
        path: '/teacher',
        name: 'teacher',
        component: () => import("@/views/teacher/Index.vue"),
        meta: { title: '老师管理', icon: "User", show: true, useFrame: true },
        children: [
            {
                path: '/teacher/list',
                name: 'teacher-list',
                component: () => import("@/views/teacher/List.vue"),
                meta: { title: '老师列表', icon: "List", show: true, useFrame: true },

            },
            {
                path: '/teacher/create',
                name: 'teacher-create',
                component: () => import("@/views/teacher/Create.vue"),
                meta: { title: '新增老师', icon: "List", show: true, useFrame: true },

            },
            {
                path: '/teacher/edit',
                name: 'teacher-edit',
                component: () => import("@/views/teacher/Edit.vue"),
                meta: { title: '编辑老师', icon: "List", show: false, useFrame: true },

            }
        ]
    },
    {
        path: '/batch',
        name: 'batch',
        component: () => import("@/views/batch/Index.vue"),
        meta: { title: '兑换码管理', icon: "Files", show: true, useFrame: true },

        children: [
            {
                path: '/batch/list',
                name: 'batch-list',

                component: () => import("@/views/batch/List.vue"),
                meta: { title: '批次列表', icon: "List", show: true, useFrame: true },

            },
            {
                path: '/batch/create',
                name: 'batch-create',

                component: () => import("@/views/batch/Create.vue"),
                meta: { title: '新增批次', icon: "List", show: true, useFrame: true },

            },
            {
                path: '/batch/edit',
                name: 'batch-edit',
                component: () => import("@/views/batch/Edit.vue"),
                meta: { title: '编辑批次', icon: "List", show: false, useFrame: true },

            }
            ,
            {
                path: '/batch/info',
                name: 'batch-info',
                component: () => import("@/views/batch/Info.vue"),
                meta: { title: '批次详情', icon: "List", show: false, useFrame: true },

            },
            {
                path: '/batch/obtain/code',
                name: 'batch-obtain-code',
                component: () => import("@/views/batch/ObtainCode.vue"),
                meta: { title: '获取兑换码', icon: "List", show: false, useFrame: true },

            },
            {
                path: '/batch/divide/code',
                name: 'batch-divide-code',
                component: () => import("@/views/batch/DivideCode.vue"),
                meta: { title: '分配兑换码', icon: "List", show: false, useFrame: true },

            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("@/views/user/Login.vue"),
        meta: { title: "登录", icon: "Setting", show: false, useFrame: false }
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    let { userInfo } = storeToRefs(appStore());
    var isAuthenticated = userInfo.value.token
    console.log("userInfo.value:",userInfo.value,"isAuthenticated:",isAuthenticated)

    if (to.name !== 'login' && !isAuthenticated) next({ name: 'login' })
    else next()
})
export default router