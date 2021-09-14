<template>
  <transition name="fade">
    <div v-show="show">
    <el-table :data="tableData" height="600" border style="width: 100%">
      <el-table-column prop="account" label="账号信息" width="180"></el-table-column>
      <el-table-column label="创建者身份" width="180">
          <template slot-scope="scope">
             <span>{{scope.row.creator}}</span>
          </template>
      </el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column label="注册时间">
          <template slot-scope="scope">
             <span>
                 {{scope.row.reg_time | filterRegtime}}
             </span>
          </template>
      </el-table-column>
      <el-table-column label="权限拥有者">
          <template slot-scope="scope">
             <span>
                 {{scope.row.role_name | filterRolename}}
             </span>
          </template>
      </el-table-column>
    </el-table>
  </div>
  </transition>
</template>

<script>
import { Userlist } from "@/utils/api";

export default {
  data() {
    return {
      show: false,
      tableData: []
    }
  },
  methods: {
    getList() {
      Userlist().then(res => {
        this.tableData = res.data.data;
      });
    }
  },
  mounted() {
    this.getList();
    this.show = true;
  },
  filters: {
    filterRegtime(data) {
      let date = new Date(data);
      return date.getFullYear() + ' 年 ' + (date.getMonth() + 1) + ' 月 ' + date.getDate() + '日';
    },
    filterRolename(data) {
      switch (data) {
        case 'input': return '销售人员';
        case 'administrator': return '管理员';
        default: return '初审人员'
      }
    }
  }
};
</script>