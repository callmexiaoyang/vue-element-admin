const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  staffPhoto: state => state.user.userInfo.staffPhoto // 建立用户头像的映射
  // routes:
}
export default getters
