import http from "@/http/index"
 
const userApi = {
 
    login:{
        name:"用户登录",
        url:"/code/login/",
        call: async function (params:any) {
             return await http.post(this.url,params);
        }
    },
}
export default userApi;