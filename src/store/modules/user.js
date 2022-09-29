import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
const state = {
  token: getToken()
}
const mutations = {
  // 同步修改token
  setToken(state, token) {
    // 赋值
    token = state.token
    // 更新后的token存本地
    setToken(token)
  },
  // 删除token
  removeToken(state, token) {
    state.token = null
    removeToken()
  }
}
const actions = {
  async login(context, data) {
    const result = await login(data)
    // context.setToken(result)
    context.commit('setToken', result)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
