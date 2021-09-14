<template>
  <div class="sidebar">
    <el-menu-item :index="basepath" v-if="!item.children">
      <i class="el-icon-menu"></i>
      <span slot="title">{{item.meta.title}}</span>
    </el-menu-item>

    <el-submenu :index="basepath" v-else>
      <template slot="title">
        <i class="el-icon-location" v-if="item.children"></i>
        <span>贷款审批</span>
      </template>
      <SideBarItem 
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :basepath="child.path"
      />
    </el-submenu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SideBarItem",
  props: ["item", "basepath"],
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>
