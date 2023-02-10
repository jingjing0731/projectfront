import { defineStore } from 'pinia'
 
export const appStore = defineStore({
 id: 'exchangecodeapp',
 state:()=>{
     return {
        userInfo:{
            username: "",
            token: "",
          },

       tableList:[{
        title:"主页",
        name:"home",
        close:false,
       }],

       activeTableName:"home",
     }
 },
 getters:{
 
},
 actions:{
 
},
   // 开启数据缓存
   persist: {
       enabled: true,
       strategies: [
           {
             key: 'exchangecodeapp',
             storage: localStorage,
           }
         ]
     }
})