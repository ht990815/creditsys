<template>
 <div>
  <transition name="fade">
   <div v-if="show">
    <el-form :inline="true" :model="pages" class="demo-form-inline">
     <el-form-item>
      <el-input v-model="pages.name" placeholder="输入名字搜索"></el-input>
     </el-form-item>
     <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
     </el-form-item>
    </el-form>

    <el-card class="box-card" style="width: 100%;">
     <el-table style="width: 100%;" :data="lists" height="480">
      <el-table-column prop="id" label="申请ID" width="80"></el-table-column>
      <el-table-column prop="loan_name" label="姓名" width="100"></el-table-column>
      <el-table-column prop="loan_card" label="身份证号" width="200"></el-table-column>
      <el-table-column prop="approve" label="审批人员" width="100"></el-table-column>
      <el-table-column prop="created" label="创建时间" width="300"></el-table-column>
      <el-table-column prop="loan_card" label="合同状态" width="300">
       <template slot-scope="rows">
        <el-tag :type="rows.row.file_path|formatFilePath">{{rows.row.file_path|formatText}}</el-tag>
       </template>
      </el-table-column>
      <el-table-column width="300" prop="address" label="操作">
       <template slot-scope="rows">
        <el-button :disabled="rows.row.file_path|formatDisable" plain  type="primary" @click="Create(rows.row)">生成合同</el-button>
        <el-button :disabled="rows.row.file_path|formatDisable1" plain type="success" @click="Download(rows.row)">下载合同</el-button>
       </template>
      </el-table-column>
     </el-table>
    </el-card>

    <el-pagination
     @size-change="handleSizeChange"
     @current-change="handleCurrentChange"
     :current-page="pages.pageNo"
     :page-sizes="[10, 12, 14, 16]"
     :page-size="pages.pageSize"
     layout="total, sizes, prev, pager, next, jumper"
     :total="rows"
     style="margin-top:30px;"
    ></el-pagination>
   </div>
  </transition>
 </div>
</template>

<script>
import { ContractList, CreateFile, DownloadFile } from "@/utils/api";

export default {
 data() {
  return {
   lists: [],
   pages: {
    pageNo: 1,
    pageSize: 10,
    name: ""
   },
   pageCount: 0,
   rows: 0,
   centerDialogVisible: false,
   UserInfo: {},
   show: false
  };
 },
 methods: {
  Download(data) {
    let api = "http://139.196.42.209:5004";
    let self = this;
    DownloadFile(data).then(res => {
      let url = api + res.data.data.url;
      let xhr = new XMLHttpRequest();
      xhr.open("get", url);
      xhr.responseType = "blob";
      xhr.setRequestHeader("token", sessionStorage.getItem("token"));
      xhr.send();
      xhr.onload = function () {
        let data = xhr.response;
        self.handleDownload(xhr.responseURL, data);
      }
    })
  },
  handleDownload(name, data) {
    let blob = new Blob([data]);
    let urlObject = URL.createObjectURL(blob);
    let ela = document.createElement("a");
    ela.href = urlObject
    ela.download = name;
    ela.click();
    this.$message.success("下载成功!");
  },
  Create(data) {
    CreateFile(data).then(res => {
      if (res.data.code === 20000) {
        this.$message.success("生成合同成功！");
      } else {
        this.$message.error("后台开小差了，请联系管理员！");
      }
    })
    this.getList();
  },
  onSubmit() {
   this.getList();
  },
  handleSizeChange(val) {
   this.pages.pageSize = val;
   this.getList();
  },
  handleCurrentChange(val) {
   this.pages.pageNo = val;
   this.getList();
  },
  getList() {
   ContractList(this.pages).then(res => {
    if (res.data.code == 20000) {
     let datas = res.data.data.data;
     this.lists = datas.data;
     this.pageCount = datas.pages;
     this.rows = datas.rows;
    } else {
     this.$message.error("请求数据不成功！");
    }
   });
  }
 },
 filters: {
  formatDisable1(data) {
   switch (data) {
    case "" || null:
     return true;
    default:
     return false;
   }
  },
  formatDisable(data) {
   switch (data) {
    case "" || null:
     return false;
    default:
     return true;
   }
  },
  formatFilePath(data) {
   switch (data) {
    case "" || null:
     return "warning";
    default:
     return "success";
   }
  },
  formatText(data) {
   switch (data) {
    case "" || null:
     return "未生成合同";
    default:
     return "合同生成，可下载";
   }
  }
 },
 mounted() {
  this.getList();
  this.show = true;
 }
};
</script>
<style scoped>

</style>