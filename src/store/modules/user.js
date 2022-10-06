import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getInfo, getUserDetailById } from '@/api/user'
const state = {
  token: getToken(),
  userInfo: {}
}
const mutations = {
  // 同步修改token
  setToken(state, payload) {
    // 赋值
    state.token = payload
    // 更新后的token存本地
    setToken(payload)
  },
  // 删除token
  removeToken(state, payload) {
    state.token = null
    removeToken()
  },
  // 存用户信息
  setUserInfo(state, payload) {
    state.userInfo = payload
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  // 异步获取token
  async login(context, data) {
    // 调接口，拿token
    const result = await login(data)
    // 存获取token的时间戳
    setTimeStamp()
    // context.setToken(result)
    console.log(result)
    // 存token
    context.commit('setToken', result)
  },
  // 异步获取用户信息
  async getUserInfo(context) {
    // 调接口存用户信息
    const result = await getInfo()
    // 调接口，拿用户头像
    const baseInfo = await getUserDetailById(result.userId)
    const baseResult = { ...result, ...baseInfo }
    console.log(baseResult)
    context.commit('setUserInfo', baseResult)
    // 伏笔？？
    return baseResult
  },
  logout(context) {
    // 删除用户token
    context.commit('removeToken')
    // 删除用户资料
    context.commit('removeUserInfo')
    // 跳转登录页
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
