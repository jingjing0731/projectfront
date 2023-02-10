import http from "@/http/index"
//抽取方法
const areaAPI = {
    select: {
        name: "校区查询",
        url: "/code/area/",
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
export default areaAPI;