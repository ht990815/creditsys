<template>
<transition name="fade">
 <div v-show="show">
  <div style="margin-top: 10px;">
   <el-form :inline="true" :model="pages" class="demo-form-inline">
    <el-form-item>
     <el-input v-model="pages.name" placeholder="输入名字搜索"></el-input>
    </el-form-item>
    <el-form-item>
     <el-button type="primary" :loading="loading" @click="onSubmit">查询</el-button>
    </el-form-item>
   </el-form>

   <el-card class="box-card" style="width: 100%;margin-top:20px;">
    <el-table style="width: 100%;" :data="lists" height="480">
     <el-table-column prop="approve" label="检查者" width="120"></el-table-column>
     <el-table-column prop="loan_id" label="申请单号" width="120"></el-table-column>
     <el-table-column prop="loan_name" label="姓名" width="120"></el-table-column>
     <el-table-column prop="loan_card" label="身份证" width="300"></el-table-column>
     <el-table-column prop="result" label="状态" width="100">
      <template slot-scope="rows">
       <el-tag :type="rows.row.result|formatStatus">{{rows.row.result|formatText}}</el-tag>
      </template>
     </el-table-column>
     <el-table-column prop="address" label="操作">
      <template slot-scope="scope">
       <el-button plain type="primary" @click="Info(scope.row)">查看</el-button>
       <el-button plain type="success" :disabled="scope.row.result==='pass'||scope.row.result==='reject'" @click="Pass(scope.row)">通过</el-button>
       <el-button plain type="danger" :disabled="scope.row.result==='pass'||scope.row.result==='reject'" @click="Reject(scope.row)">拒绝</el-button>
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
    style="margin-top:30px;box-shadow: 0 0 5px 2px #ecf0f1;padding:10px;"
   ></el-pagination>

   <!-- 弹出提示框 -->
   <el-dialog
    title="初审-用户详情"
    :visible.sync="centerDialogVisible"
    width="50%"
    style="text-align:center;"
   >
    <div>
     <ul style="list-style:none;font-size:18px;">
      <li>
       <b style="display:inline-block;margin:5px;">ID：</b>
       <input class="inputinfo" type="text" :value="UserInfo.id" readonly />
       <br />
       <b style="display:inline-block;margin:5px;">名字：</b>
       <input class="inputinfo" type="text" :value="UserInfo.name" readonly />
       <br />
       <b style="display:inline-block;margin:5px;">祖籍：</b>
       <input class="inputinfo" type="text" :value="UserInfo.address1" readonly />
       <br />
       <b style="display:inline-block;margin:5px;">现住址：</b>
       <input class="inputinfo" type="text" :value="UserInfo.address2" readonly />
       <br />
       <b style="display:inline-block;margin:5px;">性别：</b>
       <input class="inputinfo" type="text" :value="UserInfo.sex|FormatSex" readonly />
       <br />
       <b style="display:inline-block;margin:5px;">年龄：</b>
       <input class="inputinfo" type="text" :value="UserInfo.birthday|FormarAge" readonly />
       <br />
       <b style="display:inline-block;margin:5px;">学历：</b>
       <input class="inputinfo" type="text" :value="UserInfo.education|FormarEducation" readonly />
      </li>
     </ul>
    </div>
    <span slot="footer" class="dialog-footer">
     <el-button @click="centerDialogVisible = false">取 消</el-button>
     <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
    </span>
   </el-dialog>
  </div>
 </div>
 </transition>
</template>

<script>
import {
 ApproveFirstList,
 AppQueryInfo,
 ApproveFirstPass,
 ApproveFirstReject
} from "@/utils/api.js";

export default {
 data() {
  return {
    show: false,
   loading: false,
   lists: [],
   pages: {
    pageNo: 1,
    pageSize: 10,
    name: ""
   },
   pageCount: 0,
   rows: 0,
   centerDialogVisible: false,
   UserInfo: {}
  };
 },
 methods: {
  onSubmit() {
   this.loading = true;
   this.pages.pageNo = 1;
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
   ApproveFirstList(this.pages).then(res => {
    console.log(res.data.data.data);
    if (res.data.code == 20000) {
     let datas = res.data.data.data;
     this.lists = datas.data;
     this.pageCount = datas.pages;
     this.rows = datas.rows;
     this.loading = false;
    } else {
     this.$message.error("请求数据不成功！");
    }
   });
  },
  Info(val) {
   AppQueryInfo({ id: val.loan_id }).then(res => {
    if (res.data.code == 20000) {
     this.UserInfo = res.data.data.data;
     this.centerDialogVisible = true;
    } else {
     this.$message.error("后台除了小差错，请联系管理员！");
    }
   });
  },
  Pass(val) {
   let obj = {
    appid: val.id,
    loanid: val.loan_id
   };
   ApproveFirstPass(obj).then(res => {
    if (res.data.code == 20000) {
     this.UserInfo = res.data.data.data;
     this.centerDialogVisible = true;
     this.$message.success("提交成功！");
    } else {
     this.$message.error("后台除了小差错，请联系管理员！");
    }
   });
  },
  Reject(val) {
   let obj = {
    appId: val.id,
    loanId: val.loan_id
   };
   ApproveFirstReject(obj).then(res => {
    if (res.data.code == 20000) {
     this.$message.success("拒绝成功！");
    } else {
     this.$message.error("后台除了小差错，请联系管理员！");
    }
   });
  }
 },
 filters: {
  formatText(data) {
   switch (data) {
    case "pass":
     return "通过";
    case "reject":
     return "拒绝";
    default:
     return "初审";
   }
  },
  formatStatus(data) {
   switch (data) {
    case "pass":
     return "success";
    case "reject":
     return "danger";
    default:
     return "info";
   }
  },
  FormatSex(val) {
   return val == "man" ? "男" : "女";
  },
  FormarAge(val) {
   let date = new Date(val);
   return new Date().getFullYear() - date.getFullYear();
  },
  FormarEducation(val) {
   if (val == "college") {
    return "大学";
   } else if (val == "hignscool") {
    return "高中";
   } else {
    return "其他";
   }
  }
 },
 mounted() {
  this.getList();
  this.show = true;
 }
};
</script>