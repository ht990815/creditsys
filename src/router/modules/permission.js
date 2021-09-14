const permission = {
    path: "/Authority",
    name: "Authority",
    component: () => import("@/views/Authority/index.vue"),
    redirect: "/create",
    children: [
      {
        path: "/Authority/create",
        name: "create",
        component: () => import("@/views/Authority/create"),
        meta: {
          title: "创建管理员"
        }
      },
      {
        path: "/Authority/list",
        name: "list",
        component: () => import("@/views/Authority/List"),
        meta: {
          title: "列表展示"
        }
      }
    ]
  }
export default permission;