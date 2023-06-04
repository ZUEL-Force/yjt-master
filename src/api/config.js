// export const baseUrl=process.env.VUE_APP_API_HOST
import router from "@/router";

const baseUrl='http://43.142.142.39:18080/api'
// const baseUrl='http://www.zuel-force.cn:8080/api'
import axios from 'axios'
import {resetUserState} from "@/view/pageConfig";
import {message} from "ant-design-vue";
const request = axios.create({
    baseURL: baseUrl,
    timeout: 6000,
})


function post(data, url) {
    return request({
        url: url,
        method: 'post',
        data,
        // headers: {
        //     'Content-type': 'application/json',
        // },
    })

}


function formPost(data, url) {
    return request({
        url: url,
        method: 'post',
        data,
        // transformRequest: [
        //     function (data) {
        //         // 将请求数据转换成功 formdata 接收格式
        //         return stringify(data)
        //     }
        // ],
        // headers: {
        //     "Content-Type": 'multipart/form-data',
        //     'X-Requested-With': 'XMLHttpRequest'
        // }

    })
}

function get(data, url) {
    return request({
        url: url,
        method: 'get',
        params:data
    })
}

// 异常拦截处理器
const errorHandler = (error) => {
    console.log(error) // for debug
    return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
    // const token = myInfo.token
    // const id = myInfo.id
    // // console.log('请求拦截器',config)
    // // 如果 token 存在
    // // 让每个请求携带自定义 token 请根据实际情况自行修改
    // if (token) {
    //     // config.headers[ACCESS_TOKEN] = token
    //     Object.assign(config.data, {token: token, id: id})
    // }
    return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((res) => {
// const res = response.data
//
    if (res.data.code ===444 ) {
            resetUserState()
        message.warn('请求出错请重新登录')
            router.go(0)
        return Promise.reject(new Error(res.message || 'Error'))
    } else {
    return res
    }
}, errorHandler)




export {post, get, formPost}
