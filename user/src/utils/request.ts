import axios from "axios"
import router from "../router"
import { getToken, removeToken} from "./token"


const request = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 15000
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

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.dir(error);

    // ✅ Safely check if response exists
    if (error.response) {
      if (error.response.status === 401) {
        removeToken();
        router.navigate('/login');
      }
    } else {
      // ❗ This means network or parsing error
      console.error("No response from server:", error.message);
    }

    return Promise.reject(error);
  }
);


export {request}