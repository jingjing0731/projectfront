import http from "@/http/index"
import { id } from "element-plus/es/locale";
//抽取方法
const batchAPI = {
    select: {
        name: "批次查询",
        url: "/code/batch/",
        // async 异步方法 await 等待
        call: async function (params: any) {
            return await http.get(this.url, params);
        }
    },
    insert: {
        name: "新增批次",
        url: "/code/batch/",
        // async 异步方法 await 等待
        call: async function (params: any) {
            return await http.post(this.url, params);
        }
 
    },
    delete: {
        name: "删除批次",
        url: "/code/batch/",
        // async 异步方法 await 等待
        call: async function (params: any) {
            return await http.delete(this.url+params.id+"/");
        }
    },
    update: {
        name: "编辑批次",
        url: "/code/batch/",
        // async 异步方法 await 等待
        call: async function (params: any) {
            return await http.patch(this.url+params.id+"/",params);
        }
    },
    get_one: {
        name: "根据batch_id获取批次信息",
        url: "/code/batch/",
        // async 异步方法 await 等待
        call: async function (params: any) {
            return await http.get(this.url+params.id+"/");
        }
    },
 
}
//导出,类似于public公用
export default batchAPI;