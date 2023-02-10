import http from "@/http/index"
//抽取方法
const schoolAPI = {
    select: {
        name: "分校查询",
        url: "/code/school/",
        // async 异步方法 await 等待
        call: async function (params: any) {
            return await http.get(this.url, params);
        }
    },
    get_schools_from_area: {
        name: "根据区域查询分校",
        url: "/code/school/get_schools_from_area/",
        // async 异步方法 await 等待
        call: async function (params: any) {
            return await http.get(this.url, params);
        }
    },
    insert: {
 
    },
    update: {
 
    },
 
}
//导出,类似于public公用
export default schoolAPI;