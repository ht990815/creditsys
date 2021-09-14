import axios from "axios"
axios.defaults.baseURL = "http://139.196.42.209:5004/api/"

// 请求拦截器
axios.interceptors.request.use(function (config) {
    // 再发送请求前
    config.headers["token"] = sessionStorage.getItem("token"); // 根据后端描述将token放在请求头中发送
    return config;
}, function (err) {
    // 请求错误
    return Promise.reject(err);
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
    // 响应数据干什么
    if (response.data.code == 20000) {

    } else {

    }
    return response;
}, function (err) {
    // 相应错误
    return Promise.reject(err);
})

export default axios;  // 导出axios