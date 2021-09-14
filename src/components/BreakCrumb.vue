<template>
  <div class="BreakBar">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
       <el-breadcrumb-item :to="{ path: this.$route.path }">{{this.$route.meta.title}}</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "BreakBar",
  methods: {
  }
};
</script>

<style scoped>
.el-header {
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  border-bottom: 1px solid rgb(238, 236, 236);
}
.LoginOut {
  position: absolute;
  right: 100px;
  width: 100px;
  height: 40px;
  border: 2px solid #0984e3;
  background-color: rgba(53, 39, 39, 0);
  color: #0984e3;
  font-weight: bold;
  outline: none;
}
.LoginOut:hover {
  color: white;
  background-color: #0984e3;
}
</style>
