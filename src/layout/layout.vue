<template>
 <div class="index">
  <el-container style="height:100%;min-width:1600px;">
   <SideBar />
   <!-- 导航 -->
   <el-container>
    <el-header>
     <!-- 面包屑 -->
     <BreakCrumb />
     <div class="LoginOut">
      <label style="margin-right:20px;">
       欢迎登录，
       <span style="color:#0984E3;">{{username | handleUser}}</span>！
      </label>
      <el-button type="primary" @click="LoginOut()">退出登录</el-button>
     </div>
    </el-header>
    <transition name="fade">
     <div v-if="show">
      <RouteExit />
     </div>
    </transition>

    <!-- 路由出口 -->
   </el-container>
  </el-container>
 </div>
</template>

<script>
import { SideBar, BreakCrumb, RouteExit } from "@/components/index.js";
import { LoginOutFn } from "@/utils/api";
import { mapGetters } from "vuex";

export default {
 data() {
  return {
   show: false,
   username: ""
  };
 },
 methods: {
  LoginOut() {
   this.$store
    .dispatch("logout")
    .then(res => {
     this.$message({
      message: "已成功退出登录!",
      type: "success"
     });
     this.$router.push("/login");
     sessionStorage.removeItem("token");
    })
    .catch(err => {
     this.$message.error("退出登录有误,请重新尝试!");
    });
  },
  RouteInterception() {
   let token = sessionStorage.getItem("token");
   if (!token) {
    alert("请先登录！");
    this.$router.push("/login");
   } else {
     this.$store.commit("GENERATEROUTES", this.$store.state.user.roles[0].name);
     this.$router.push(this.$route.path);
   }
  }
 },
 mounted() {
  this.RouteInterception();
  this.show = true;
  this.username = this.$store.state.user.roles[0].name;
 },
 components: {
  SideBar,
  BreakCrumb,
  RouteExit
 },
 filters: {
  handleUser(data) {
   switch (data) {
    case "input":
     return "销售员";
    case "approve":
     return "初审员";
    case "administrator":
     return "管理员";
   }
  }
 }
};
</script>
<style scoped>
.el-header {
 background-color: white;
 display: flex;
 align-items: center;
 position: relative;
 border-bottom: 1px solid rgb(238, 236, 236);
}
.LoginOut {
 float: right;
 position: absolute;
 right: 50px;
}

.fade-enter-active {
 transition: 1s;
 opacity: 1;
 margin-left: 0px;
}
.fade-enter {
 opacity: 0;
 margin-left: 100px;
}
</style>