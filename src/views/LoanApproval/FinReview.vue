<template>
 <transition name="fade">
  <div v-show="show">
   <el-form :inline="true" :model="data" class="demo-form-inline">
    <el-form-item>
     <el-input v-model="data.name" placeholder="输入名字搜索"></el-input>
    </el-form-item>
    <el-form-item>
     <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
   </el-form>

   <el-table :data="lists" style="width: 100%" border height="500">
    <el-table-column prop="approve" label="审核员" width="180"></el-table-column>
    <el-table-column prop="id" label="ID" width="50"></el-table-column>
    <el-table-column prop="loan_card" label="申请ID" width="180"></el-table-column>
    <el-table-column prop="loan_id" label="申请序号" width="180"></el-table-column>
    <el-table-column prop="loan_name" label="申请人" width="180"></el-table-column>
    <el-table-column prop="modified" label="修改时间" width="180">
     <template slot-scope="rows">
      <span>{{rows.row.modified|formatDate}}</span>
     </template>
    </el-table-column>
    <el-table-column prop="result" label="状态" width="180">
     <template slot-scope="rows">
      <el-button
       type="text"
       :style="{color: formatColor(rows.row.result)}"
      >{{rows.row.result|formatStatus}}</el-button>
     </template>
    </el-table-column>
    <el-table-column label="操作" width="300">
     <template slot-scope="rows">
      <el-button plain @click="getInfo(rows)" type="primary">详情</el-button>
      <el-button
       plain
       @click="Pass(rows)"
       :disabled="rows.row.result|formatDisabled"
       type="success"
      >通过</el-button>
      <el-button
       plain
       @click="Reject(rows)"
       :disabled="rows.row.result|formatDisabled1"
       type="danger"
      >拒绝</el-button>
     </template>
    </el-table-column>
   </el-table>

   <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="data.pageNo"
    :page-sizes="[5, 10, 15, 20]"
    :page-size="data.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="rows"
    style="margin-top: 50px;"
   ></el-pagination>
  </div>
 </transition>
</template>

<script>
import {
 AppFinalList,
 AppFinalInfo,
 AppFinalPass,
 AppFinalReject,
 ApproveFirstReject
} from "../../utils/api";

export default {
 data() {
  return {
   show: true,
   pages: 1,
   rows: 0,
   lists: [],
   data: {
    pageNo: 1,
    pageSize: 10,
    name: ""
   }
  };
 },
 methods: {
  Reject(rows) {
   let { id, loan_id } = rows.row;
   ApproveFirstReject({ appid: id, loanid: loan_id }).then(res => {
    if (res.data.code !== 20000) {
     this.$notify({
      title: "通知",
      message: "后台数据出现了小差错！稍后重试",
      type: "error"
     });
    } else {
     alert(res.data.data);
    }
   });
  },
  Pass(rows) {
   let { id, loan_id } = rows.row;
   AppFinalPass({ appid: id, loanid: loan_id }).then(res => {
    if (res.data.code !== 20000) {
     this.$notify({
      title: "通知",
      message: "后台数据出现了小差错！稍后重试",
      type: "error"
     });
    } else {
     alert(res.data.data);
    }
   });
  },
  getInfo(rows) {
   AppFinalInfo(rows.row.id).then(res => {
    if (res.data.code !== 20000) {
     this.$notify({
      title: "通知",
      message: "后台数据出现了小差错！稍后重试",
      type: "error"
     });
    } else {
     alert(res.data.data);
    }
   });
  },
  handleSizeChange(val) {
   this.data.pageSize = val;
   this.getData();
  },
  handleCurrentChange(val) {
   this.data.pageNo = val;
   this.getData();
  },
  onSubmit() {
   this.getData();
  },
  getData() {
   AppFinalList(this.data).then(res => {
    let { pages, rows, data } = res.data.data.data;
    this.lists = data;
    this.pages = pages;
    this.rows = rows;
   });
  },
  formatColor(data) {
   switch (data) {
    case "pass":
     return "#2ecc71";
    case "reject":
     return "#e74c3c";
    default:
     return "#f1c40f";
   }
  }
 },
 mounted() {
  this.getData();
  this.show = true;
 },
 filters: {
  formatDate(data) {
   let d = new Date(data);
   let str = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
   return str;
  },
  formatStatus(data) {
   switch (data) {
    case "pass":
     return "终审通过";
    case "reject":
     return "终审拒绝";
    default:
     return "出错";
   }
  },
  formatDisabled(data) {
   switch (data) {
    case "pass":
     return true;
    case "reject":
     return false;
    default:
     return true;
   }
  },
  formatDisabled1(data) {
   switch (data) {
    case "pass":
     return true;
    case "reject":
     return true;
    default:
     return false;
   }
  }
 }
};
</script>
<style scoped>
</style>