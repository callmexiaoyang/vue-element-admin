import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTimeStamp } from './auth'
import router from '@/router'
// 设置token超时时间
const timeExceed = 2 * 60 * 60

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // token超时，登出
      if ((Date.now() - getTimeStamp()) / 1000 > timeExceed) {
        store.dispatch('user/logout')
        // 跳转登录页
        router.push('/login')
        // 抛出异常
        return Promise.reject(new Error('token超时了！'))
      }
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const { data, success, message } = response.data
    if (success) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error(message))
    }
    // return response
  },
  // 接口没调通
  error => {
    if (error.responese && error.responese.data && error.responese.data.code === 10002) {
      store.dispatch('user/logout')
      // 跳转登录页
      router.push('/login')
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
)

export default service
