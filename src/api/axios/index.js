
import axios from "axios"

let cancel
let promiseArr = {}
const CancelToken = axios.CancelToken

const Axios = axios.create({
    baseURL: "",
    timeout: 5000,
    responseType: "json"
    // withCredentials: true    // 是否需要携带 Cookies
})

Axios.interceptors.request.use(
    config => {
        if (promiseArr[config.url]) promiseArr[config.url]()
        promiseArr[config.url] = cancel

        return config
    },
    error => {
        return Promise.reject(error)
    }
)

Axios.interceptors.response.use(
    res => {
        return res.data
    },

    error => {
        if (error && error.response) {
            switch (error.response.status) {
            case 400:
                error.message = "错误请求"
                break
            case 401:
                error.message = "未授权，请重新登录"
                break
            case 403:
                error.message = "拒绝访问"
                break
            case 404:
                error.message = "请求错误,未找到该资源"
                break
            case 405:
                error.message = "请求方法未允许"
                break
            case 408:
                error.message = "请求超时"
                break
            case 500:
                error.message = "服务器端出错"
                break
            case 501:
                error.message = "网络未实现"
                break
            case 502:
                error.message = "网络错误"
                break
            case 503:
                error.message = "服务不可用"
                break
            case 504:
                error.message = "网络超时"
                break
            case 505:
                error.message = "http版本不支持该请求"
                break
            default:
                error.message = `连接错误${error.response.status}`
            }
        } else {
            error.message = "连接到服务器失败"
        }

        return Promise.reject(error)
    }
)

export default {

    get (url, param) {
        return new Promise((resolve, reject) => {
            Axios({
                method: "get",
                url,
                params: param,
                cancelToken: new CancelToken(c => {
                    cancel = c
                })
            }).then(res => {
                resolve(res)
            }).catch(err => reject(err))
        })
    },

    post (url, param) {
        return new Promise((resolve, reject) => {
            Axios({
                method: "post",
                url,
                data: param,
                cancel: new CancelToken(c => {
                    cancel = c
                })
            }).then(res => {
                resolve(res)
            }).catch(err => reject(err))
        })
    }
}
