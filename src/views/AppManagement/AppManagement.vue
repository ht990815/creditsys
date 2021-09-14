<template>
 <transition name="fade">
  <div class="index" v-show="show">
   <!-- 搜索 -->
   <div class="search-box">
    <el-input v-model="pages.name" placeholder="请输入姓名" style="width:600px;"></el-input>
    <el-button type="primary" @click="getList()">
     <i class="el-icon-search"></i>搜索
    </el-button>
   </div>

   <el-table :data="lists" height="500" border style="width: 100%;margin-top:20px;">
    <el-table-column prop="id" label="ID" width="80"></el-table-column>
    <el-table-column prop="name" label="名字" width="80"></el-table-column>
    <el-table-column prop="sex" label="性别" width="50"></el-table-column>
    <el-table-column prop="birthday" label="出生日期" width="180">
     <template slot-scope="rows">
      <span>{{rows.row.birthday|formatDate}}</span>
     </template>
    </el-table-column>
    <el-table-column prop="education" label="教育经历" width="50">
     <template slot-scope="rows">
      <span>{{rows.row.education|formatEdu}}</span>
     </template>
    </el-table-column>
    <el-table-column prop="address1" label="居住地" width="180"></el-table-column>
    <el-table-column prop="address2" label="户籍地址" width="180"></el-table-column>
    <el-table-column prop="status" label="状态" width="180">
     <template slot-scope="rows">
      <el-tag :type="rows.row.status|formatType" plain>{{rows.row.status|formatStatus}}</el-tag>
     </template>
    </el-table-column>

    <el-table-column label="操作" width="300">
     <template slot-scope="rows">
      <el-button
       :disabled="rows.row.status|formatDisabled"
       plain
       type="primary"
       @click="showEdit(rows.row)"
      >编辑</el-button>
      <el-button
       :disabled="rows.row.status|formatDisabled"
       plain
       type="success"
       @click="submitReview(rows.row)"
      >提交审核</el-button>
      <el-button plain type="danger" @click="delList(rows.row)">删除</el-button>
     </template>
    </el-table-column>
   </el-table>

   <!-- 点击去往多少页 -->
   <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pages.pageNo"
    :page-sizes="[5, 10, 15, 20]"
    :page-size="pages.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="rows"
    style="margin-top:50px;"
   ></el-pagination>

   <!-- 编辑 -->
   <el-dialog title="编辑信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
    <div>
     <el-form :inline="true" :model="dialogData" class="demo-form-inline">
      <el-form-item label="姓名">
       <el-input v-model="dialogData.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
       <el-select v-model="dialogData.sex">
        <el-option label="男" value="man"></el-option>
        <el-option label="女" value="woman"></el-option>
       </el-select>
      </el-form-item>
      <el-form-item>
       <el-button @click="handleClose">取 消</el-button>
       <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </el-form-item>
     </el-form>
    </div>
   </el-dialog>
  </div>
 </transition>
</template>

<script>
import { LoanList, Edit, DeleteItem, submitToApprove } from "@/utils/api";

export default {
 data() {
  return {
   show: false,
   dialogVisible: false,
   dialogData: {},
   lists: [],
   rows: 0,
   pages_: 0,
   pages: {
    pageNo: 1,
    pageSize: 20,
    name: ""
   }
  };
 },
 methods: {
  changeData() {
   Edit(this.dialogData).then(res => {
    if (res.data.code === 20000) {
     this.dialogVisible = false;
     this.$message({
      type: "success",
      message: "修改成功!"
     });
     this.getList();
    }
   });
  },
  handleSubmit() {
   this.changeData();
  },
  handleClose(done) {
   this.$confirm("确认关闭？")
    .then(_ => {
     this.dialogVisible = false;
     this.$message({
      type: "提示",
      message: "取消修改!",
      type: "warning"
     });
     this.getList();
     done();
    })
    .catch(_ => {});
  },
  showEdit(data) {
   this.dialogData = data;
   this.dialogVisible = true;
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
   LoanList(this.pages).then(res => {
    if (res.data.code == 20000) {
     let { data, pages, rows } = res.data.data.data;
     this.lists = data;
     this.rows = rows;
     this.pages_ = pages;
    }
   });
  },
  delList(data) {
   this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
   })
    .then(() => {
     DeleteItem({ id: data.id }).then(res => {
      if (res.data.code == 20000) {
       this.$message({
        type: "success",
        message: "删除成功!"
       });
       this.getList();
      }
     });
    })
    .catch(() => {
     this.$message({
      title: "通知",
      message: "取消删除",
      type: "info"
     });
    });
  },
  submitReview(v) {
   submitToApprove({ id: v.id }).then(res => {
    if (res.data.code == 20000) {
     this.$message({
      type: "success",
      message: "提交成功！!"
     });
     this.$router.push("/loanapp/prereview");
    }
   });
  }
 },
 filters: {
  formatDisabled(data) {
   return data === 0 || data === 3 ? false : true;
  },
  formatStatus(data) {
   switch (data) {
    case 0:
     return "进件中";
    case 1:
     return "提交初审";
    case 2:
     return "初审通过";
    case 3:
     return "初审拒绝";
    case 4:
     return "提交终审";
    case 5:
     return "终审通过";
    case 6:
     return "终审拒绝";
    case 7:
     return "生成合同";
   }
  },
  formatType(data) {
   switch (data) {
    case 0:
     return "default";
    case 1 || 4:
     return "primary";
    case 2 || 5:
     return "info";
    case 3 || 6:
     return "danger";
    default:
     return "success";
   }
  },
  formatDate(data) {
   let d = new Date(data);
   let str = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
   return str;
  },
  formatEdu(data) {
   switch (data) {
    case "college":
     return "大学";
    case "highschool":
     return "高中";
    default:
     return "其他";
   }
  },
  formatSex(data) {
   switch (data) {
    case "woman":
     return "女";
    case "max":
     return "高中";
    default:
     return "出错";
   }
  }
 },
 mounted() {
  this.getList();
  this.show = true;
 }
};
</script>