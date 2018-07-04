export default {
  state: {
    userName: '',
    token: ''
  },
  mutations: {
    setUserName(state, name) {
      state.userName = name
    }
  },
  actions: {
    getUserInfo({state, commit}) {
      return fetch('https://www.9ji.com/web/api/area/hotArea/v1').then(res => {
        commit('setUserName', res.data.data)
      })
    }
  }
}
