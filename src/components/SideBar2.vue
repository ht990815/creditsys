<template>
  <div class="sidebar">
    <el-aside width="200px" style="background:#636e72;height:100%;">
      <el-col :span="12" style="width:100%;">
        <el-menu
          router
          :default-active="this.$route.path"
          class="el-menu-vertical-demo"
          background-color="#2d3436"
          text-color="#fff"
          active-text-color="#0984e3"
          :unique-opened="true"
          :collapse-transition="false"
        >
          <el-menu-item index="/index">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-menu-item index="/loaninput">
            <i class="el-icon-setting"></i>
            <span slot="title">贷款申请</span>
          </el-menu-item>

          <el-menu-item index="/AppManagement">
            <i class="el-icon-setting"></i>
            <span slot="title">申请管理</span>
          </el-menu-item>

          <el-submenu index="/loanapp">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>贷款审批</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/loanapp/prereview">初审</el-menu-item>
              <el-menu-item index="/loanapp/finreview">终审</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index="/TargetManagement">
            <i class="el-icon-setting"></i>
            <span slot="title">标的管理</span>
          </el-menu-item>

          <el-submenu index="/Authority">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/Authority/create">创建管理员</el-menu-item>
              <el-menu-item index="/Authority/list">列表展示</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  }
};
</script>

<style scoped>
</style>
