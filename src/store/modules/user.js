import { getInfo, LoginOutFn } from '@/utils/api'

const state = {
  token: localStorage.getItem('token'),
  roles: [],  //角色
  count: 2505
};
const getters = {
  token: state => state.token,
  roles: state => state.roles,
};
const actions = {
  USERINFO({ commit, state }) {   //获取用户详情
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response.data;
        commit('SET_ROLES', data.roles)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout({ commit, state }) {   //退出
    return new Promise((resolve, reject) => {
      LoginOutFn(state.token).then(response => {
        commit('SET_ROLES', [])  //清空
        commit('SET_TOKEN', '')
        localStorage.removeItem("token")  //删除token
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
};
const mutations = {
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
