import { login, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, setAdminToken, removeAdminToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response
          console.log(data)

          setToken(data.sessionToken)
          setAdminToken(data.adminSessionToken)

          commit('SET_TOKEN', data.sessionToken)
          commit('SET_ADMIN_TOKEN', data.adminSessionToken)

          commit('SET_ROLES', 'admin')
          commit('SET_NAME', data.username)
          commit('SET_AVATAR', data.userPic)

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        resolve()
        getInfo(state.token).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        console.log(`h`)
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        removeAdminToken()
        resolve()
        // logout(state.token).then(() => {
        //   commit('SET_TOKEN', '')
        //   commit('SET_ROLES', [])
        //   removeToken()
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        removeAdminToken()
        resolve()
      })
    }
  }
}

export default user
