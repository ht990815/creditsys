import Vue from 'vue'
import VueRouter from 'vue-router'
import loanApp from './modules/loanApp'
import permission from './modules/permission'

Vue.use(VueRouter)

//获取原型对象上的push函数，解决路由重复点击报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 路由分两个模块 1、常规配置，全部展示  2、动态配置的
// 每次进来必须有的，常规路由
export const constantRoutes = [
  {
    path: '/',
    redirect: "/home",
    component: () => import('../views/home/Index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/home', // home页面
    name: 'home',
    redirect: "/index", // 一进来重定向到index页面
    meta: { roles: ['input', 'approve'] },
    component: () => import('@/layout/layout.vue'),
    children: [
      {
        path: '/index',
        name: 'index', // 首页
        component: () => import('../views/home/Index.vue')
      }
    ]
  }
]



// 动态加载的路由
export const asyncRoutes = [
  {
    path: '/index',
    name: 'index', // 首页
    component: () => import('../views/home/Index.vue'),
    meta: { title: "首页", roles: ['input', 'approve'] }
  },
  {
    path: '/loaninput',
    name: 'loaninput', // 申请管理
    component: () => import('../views/loan-input/LoanInput.vue'),
    meta: { title: "贷款申请", roles: ['input'] }
  },
  {
    path: "/AppManagement",
    name: "AppManagement",
    component: () => import('../views/AppManagement/AppManagement.vue'),
    meta: { title: "申请管理", roles: ['input'] }
  },
  loanApp,
  {
    path: '/TargetManagement',
    name: 'TargetManagement', // 标的管理
    component: () => import('../views/TargetManagement/TargetManagement.vue'),
    meta: { title: "标的管理" }
  },
  permission
]

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: constantRoutes // 必须加载进来的
})

export default router
