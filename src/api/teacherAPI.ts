import http from "@/http/index"
import { id } from "element-plus/es/locale";
//抽取方法
const teacherAPI = {
    select: {
        name: "老师查询",
        url: "/code/teacher/",
        // async 异步方法 await 等待
        call: async function (params: any) {
            return await http.get(this.url, params);
        }
    },
    insert: {
        name: "新增老师",
        url: "/code/teacher/",
        // async 异步方法 await 等待
        call: async function (params: any) {
            return await http.post(this.url, params);
        }
 
    },
    delete: {
        name: "删除老师",
        url: "/code/teacher/",
        // async 异步方法 await 等待
        call: async function (params: any) {
            return await http.delete(this.url+params.id+"/");
        }
    },
    update: {
        name: "编辑老师",
        url: "/code/teacher/",
        // async 异步方法 await 等待
        call: async function (params: any) {
            return await http.put(this.url+params.id+"/",params);
        }
    },
 
}
//导出,类似于public公用
export default teacherAPI;