import axios from "axios"
import router from "../router"
import { getToken, removeToken} from "./token"


const request = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 5000
})

//请求拦截器
request.interceptors.request.use((config) => {
    //操作config 注入token数据 

    //1.获取token
    const token = getToken()
    //2.按照后端要求做token拼接

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
    
}, (error) => {
    return Promise.reject(error)
})

//响应拦截  处理返回数据
request.interceptors.response.use((response) => {
    return response
}, (error) => {
    //监控401
    console.dir(error)
    if(error.response.status === 401){
        removeToken()
        router.navigate('')
    }
    return Promise.reject(error)
})


export {request}