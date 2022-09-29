import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
const state = {
  token: getToken()
}
const mutations = {
  getToken(state) {
    // 从本地拿token
    state.token = getToken()
  },
  setToken(state) {
    // 给本地存token
    setToken(state.token)
  },
  removeToken(state) {
    // 删除本地token
    removeToken()
    // 清空vuex
    state.token = null
  }
}
const actions = {
  async login(context, data) {
    // 调接口
    const result = await login(data)
    // 调用存token同步函数
    context.commit('setToken', result)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
