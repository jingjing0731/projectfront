import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, } from "axios";
//弹窗图标和加载图标
import { ElMessage, ElLoading } from "element-plus";
import { appStore } from "@/store/appStore"
import { storeToRefs } from 'pinia'
import router from '@/router';


let { userInfo } = storeToRefs(appStore());

 
//返回数据规则
interface IResponseData<T> {
  status: number;
  message?: string;
  data: T;
  code: string;
}
 
//默认配置,封装了一个实例对象
const config = {
  baseURL: "",
  timeout: 30 * 1000,
  withCredentials: true,
};
 
let loading: any = null;
//类似定义一个类
class Http {
  axiosInstance;  //定义了一个axiosInstance属性，未来它放的是一个axios实例
  constructor(config: any) {
    //实例化请求配置
    this.axiosInstance = axios.create(config);
 
  // 添加请求拦截器
  this.axiosInstance.interceptors.request.use(function (config) {
      //在发送请求之前做些什么
      //弄了一个加载的过度
      loading = ElLoading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)',
        //覆盖整个屏幕
        fullscreen: true
      })
      //处理token
      if (userInfo.value.token != "") {
        //拿到请求头
        let headers = config.headers as AxiosRequestHeaders
        //赋值
        headers.Authorization = userInfo.value.token
      }
      return config;
    }, function (error) {
      loading.close();
      // 对请求错误做些什么
      return Promise.reject(error);
    });
 
    // 添加响应拦截器
    this.axiosInstance.interceptors.response.use(function (response) {
      // 对响应数据做点什么
      loading.close();
      let apiData = response.data;
      console.log(apiData)
      console.log(apiData.data)
      //将apiData的属性取出来
      const { code, message, data } = apiData;
      //取出来之后处理属性
      if (code === undefined) {
        return apiData;
      }else if (code === 0) {
        return data;
      }else if (code === 401){
        ElMessage.error("登录信息失效，请重新登录！")
        router.push({ name: "login" })
      }else {
        ElMessage.error(message)
      }
      return apiData.data;
    }, function (error) {
      // 对响应错误做点什么
      loading.close();
      return Promise.reject(error);
    });
 
  }
 
  get<T>(url: string, params?: object, data = {}): Promise<IResponseData<T>> {
    return this.axiosInstance.get(url, { params, ...data });
  }
 
  post<T>(url: string, params?: object, data = {}): Promise<IResponseData<T>> {
    return this.axiosInstance.post(url, params, data);
  }
 
  put<T>(url: string, params?: object, data = {}): Promise<IResponseData<T>> {
    return this.axiosInstance.put(url, params, data);
  }

  delete<T>(url: string, params?: object, data = {}): Promise<IResponseData<T>> {
    return this.axiosInstance.delete(url, params, data);
  }

  patch<T>(url: string, params?: object, data = {}): Promise<IResponseData<T>> {
    return this.axiosInstance.patch(url, params, data);
  }
}
//类似new了一个实例
export default new Http(config);