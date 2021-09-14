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
          <SideBarItem 
            v-for="route in get_routes[0].children"
            :key="route.path"
            :item="route"
            :basepath="route.path"
          />
        </el-menu>
      </el-col>
    </el-aside>
  </div>
</template>

<script>
import SideBarItem from "./SideBarItem"
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      show: false
    };
  },
  computed: {
    ...mapGetters(['get_routes'])
  },
  components: {
    SideBarItem
  }
};
</script>

<style scoped>
</style>
