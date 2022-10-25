import axios from "axios";

const instance = axios.create({
  baseURL:"/api",
  timeout:5000
})

//任务队列
let que = []
//根据每次的请求生成hash字符串
function createHash(config) {
  const {data,params,method,url} = config
  if(data) data = JSON.stringify(data)
  if(params) params = JSON.stringify(params)
  return [method,url,data,params].join("*")
}

/**请求拦截 */
instance.interceptors.request.use(function (config) {
  //1.请求前生成hash
  let hash = createHash(config)
  const {controll} = config
  //2.如果hash存在，取消本次请求
  if(que.includes(hash)) {
    console.log("重复了")
    controll.abort()
  }
  //3.否则，添加hash,正常执行
  que.push(hash)
  return config;
}, function (error) {
  return Promise.reject(error);
});
/**响应拦截 */
instance.interceptors.response.use(function (response) {
  //1.执行完成，从队列删除hash
  const hash = createHash(response.config)
  que.splice(que.indexOf(hash),1)
  return response;
}, function (error) {
  
  if(error.message!="canceled") {
    const hash = createHash(error.config)
    que.splice(que.indexOf(hash),1)
  }
  return Promise.reject(error);
});
export default instance