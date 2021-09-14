<template>
 <div class="login-box">
  <div class="login">
   <el-card style="width:100%;">
    <div slot="header" class="clearfix">
     <h1 style="color:#409EFF;">信贷管理系统</h1>
     <h4>Credit Management System</h4>
    </div>

    <el-form inline :model="formInline" class="demo-form-inline">
     <el-form-item label="账号">
      <el-input clearable v-model="formInline.account" placeholder="输入账号"></el-input>
     </el-form-item>

     <el-form-item label="密码">
      <el-input clearable type="password" v-model="formInline.password" placeholder="输入密码"></el-input>
     </el-form-item>

     <el-form-item label="测试号">
      <el-select v-model="region">
       <el-option label="管理员" value="0"></el-option>
       <el-option label="销售人员" value="1"></el-option>
       <el-option label="初审人员" value="2"></el-option>
      </el-select>
     </el-form-item>

     <el-form-item>
      <el-button type="primary" @click="onSubmit">登录</el-button>
     </el-form-item>
    </el-form>
   </el-card>
  </div>
 </div>
</template>

<script>
import { LoginFn } from "@/utils/api";
export default {
 data() {
  return {
   formInline: {
    account: "admin",
    password: "admin@123"
   },
   region: "0",
   alreayRead: true,
   show: false
  };
 },
 watch: {
  region(news, old) {
   if (news === "0") {
    this.formInline = { account: "admin", password: "admin@123" };
   } else if (news === "1") {
    this.formInline = { account: "sale1", password: "111111" };
   } else {
    this.formInline = { account: "sad", password: "dasasdsa" };
   }
  }
 },
 mounted() {
  this.$confirm("您可以使用测试号登录系统！", "提示", {
   confirmButtonText: "确定",
   cancelButtonText: "取消",
   type: "warning",
   center: true
  });
 },
 methods: {
  onSubmit() {
   let self = this;
   LoginFn(this.formInline).then(res => {
    if (res.data.code == 20000) {
     self.$router.push("/home");
     this.$message({
      title: "登录成功",
      message: "恭喜您登录成功！",
      type: "success"
     });
     sessionStorage.setItem("token", res.data.data.token);
    } else {
     this.$message.error("用户名或者密码错误！请再检查。");
    }
   });
  },
  admins() {
   this.user = "admin";
   this.passwd = "admin@123";
  },
  sales() {
   this.user = "fgfg";
   this.passwd = "1234";
  },
  firsts() {
   this.user = "Test66";
   this.passwd = "123123";
  },
  Open() {
   this.show = true;
  },
  Close() {
   this.show = false;
  }
 }
};
</script>