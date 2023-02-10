import http from "@/http/index"
import { id } from "element-plus/es/locale";
//抽取方法
const codeAPI = {
    select_used: {
        name: "查询已使用兑换码",
        url: "/code/exchangecode/",
        // async 异步方法 await 等待
        call: async function (params: any) {
            return await http.get(this.url, params);
        }
    },
    get_code: {
        name: "获取可用兑换码",
        url: "/code/operate/get_code/",
        // async 异步方法 await 等待
        call: async function (params: any) {
            return await http.get(this.url, params);
        }
 
    },
    use_code: {
        name: "使用兑换码",
        url: "/code/exchangecode/",
        // async 异步方法 await 等待
        call: async function (params: any) {
            return await http.put(this.url+params.id+"/",params);
        }
    },
    get_num: {
        name: "获得兑换码数量信息",
        url: "/code/operate/free_code_num/",
        // async 异步方法 await 等待
        call: async function (params: any) {
            return await http.get(this.url,params);
        }
    },
    divide_code: {
        name: "获得兑换码数量信息",
        url: "/code/operate/divide_code/",
        // async 异步方法 await 等待
        call: async function (params: any) {
            return await http.post(this.url,params);
        }
    },
    
 
}
//导出,类似于public公用
export default codeAPI;