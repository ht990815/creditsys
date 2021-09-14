<template>
 <transition name="fade">
   <div v-show="show" style="font-size:16px;font-weight:bolder;">
  <el-form
   :inline="true"
   :model="ruleForm"
   :rules="rules"
   ref="ruleForm"
   label-width="100px"
   class="demo-ruleForm"
  >
   <el-card class="box-card">
    <div slot="header" class="clearfix">
     <span>申请人基本信息</span>
    </div>
    <el-form-item label="申请人" prop="name">
     <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>

    <el-form-item label="身份证" prop="identity_card">
     <el-input v-model="ruleForm.identity_card"></el-input>
    </el-form-item>

    <el-form-item label="出生日期" prop="birthday">
     <el-col :span="11">
       <el-date-picker
        type="date"
        placeholder="选择日期"
        v-model="ruleForm.birthday"
        style="width: 200px"
       ></el-date-picker>
     </el-col>
    </el-form-item>

    <el-form-item label="性别" prop="sex">
     <el-select v-model="ruleForm.sex">
      <el-option label="男" value="man"></el-option>
      <el-option label="女" value="woman"></el-option>
     </el-select>
    </el-form-item>

    <el-form-item label="性别" prop="marriage">
     <el-select v-model="ruleForm.marriage">
      <el-option label="已婚" value="married"></el-option>
      <el-option label="未婚" value="unmarried"></el-option>
     </el-select>
    </el-form-item>

    <el-form-item label="教育程度" prop="education">
     <el-select v-model="ruleForm.education">
      <el-option label="大学" value="college"></el-option>
      <el-option label="高中" value="highschool"></el-option>
      <el-option label="其他" value="other"></el-option>
     </el-select>
    </el-form-item>

    <el-form-item label="居住地址" prop="address1">
     <el-input v-model="ruleForm.address1"></el-input>
    </el-form-item>

    <el-form-item label="户籍地址" prop="address2">
     <el-input v-model="ruleForm.address2"></el-input>
    </el-form-item>

    <el-form-item label="居住地电话" prop="phone">
     <el-input v-model="ruleForm.phone"></el-input>
    </el-form-item>

    <el-form-item label="手机号" prop="mobile_phone">
     <el-input v-model="ruleForm.mobile_phone"></el-input>
    </el-form-item>
   </el-card>

   <el-card>
    <div slot="header" class="clearfix">
     <span>公司信息</span>
    </div>

    <el-form-item label="公司全称" prop="company">
     <el-input v-model="ruleForm.company"></el-input>
    </el-form-item>

    <el-form-item label="所属行业" prop="trade">
     <el-input v-model="ruleForm.trade"></el-input>
    </el-form-item>

    <el-form-item label="职位" prop="position">
     <el-input v-model="ruleForm.position"></el-input>
    </el-form-item>

    <el-form-item label="公司地址" prop="address3">
     <el-input v-model="ruleForm.address3"></el-input>
    </el-form-item>

    <el-form-item label="公司类型" prop="company_type">
     <el-input v-model="ruleForm.company_type"></el-input>
    </el-form-item>

    <el-form-item label="公司邮箱" prop="company_email">
     <el-input v-model="ruleForm.company_email"></el-input>
    </el-form-item>

    <el-form-item label="收支情况" prop="income">
     <el-input v-model="ruleForm.income"></el-input>
    </el-form-item>
   </el-card>

   <el-card>
    <div slot="header" class="clearfix">
     <span>联系人1信息</span>
    </div>

    <el-form-item label="关系1" prop="contact">
     <el-input v-model="ruleForm.contact"></el-input>
    </el-form-item>

    <el-form-item label="姓名" prop="contact_name">
     <el-input v-model="ruleForm.contact_name"></el-input>
    </el-form-item>

    <el-form-item label="手机" prop="contact_phone">
     <el-input v-model="ruleForm.contact_phone"></el-input>
    </el-form-item>
   </el-card>

   <el-card>
    <div slot="header" class="clearfix">
     <span>联系人2信息</span>
    </div>

    <el-form-item label="关系2" prop="contact2">
     <el-input v-model="ruleForm.contact2"></el-input>
    </el-form-item>

    <el-form-item label="姓名" prop="contact2_name">
     <el-input v-model="ruleForm.contact2_name"></el-input>
    </el-form-item>

    <el-form-item label="手机" prop="contact2_phone">
     <el-input v-model="ruleForm.contact2_phone"></el-input>
    </el-form-item>

    <el-form-item label="部门" prop="contact2_dep">
     <el-input v-model="ruleForm.contact2_dep"></el-input>
    </el-form-item>

    <el-form-item label="职位" prop="contact2_pos">
     <el-input v-model="ruleForm.contact2_pos"></el-input>
    </el-form-item>

    <el-form-item label="备注" prop="remark" style="display:block;">
     <el-input type="textarea" v-model="ruleForm.remark"></el-input>
    </el-form-item>
   </el-card>

   <el-form-item style="display:block;margin-top:50px;">
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
   </el-form-item>
  </el-form>
 </div>
 </transition>
</template>

<script>
import { LoanInput } from "@/utils/api";

export default {
 data() {
  return {
    show: false,
   ruleForm: {
    name: "",
    identity_card: "",
    birthday: "",
    sex: "",
    marriage: "",
    education: "",
    address1: "",
    address2: "",
    phone: "",
    mobile_phone: "",
    company: "",
    trade: "",
    position: "",
    address3: "",
    company_type: "",
    company_email: "",
    company_phone: "",
    income: "",
    contact: "",
    contact_name: "",
    contact_phone: "",
    contact2: "",
    contact2_name: "",
    contact2_phone: "",
    contact2_dep: "",
    contact2_pos: "",
    remark: ""
   },
   rules: {
    name: [{ required: true, message: "请输入申请人姓名", trigger: "blur" }],
    identity_card: [{ required: true, message: "请输入身份证信息", trigger: "blur" }],
    birthday: [{ required: true, message: "请输入出生信息", trigger: "blur" }],
    sex: [{ required: true, message: "请输入性别信息", trigger: "blur" }],
    marriage: [{ required: true, message: "请输入婚姻信息", trigger: "blur" }],
    education: [{ required: true, message: "请输入教育信息", trigger: "blur" }],
    address1: [{ required: true, message: "请输入居住地信息", trigger: "blur" }],
    address2: [{ required: true, message: "请输入户籍信息", trigger: "blur" }],
    phone: [{ required: true, message: "请输入电话信息", trigger: "blur" }],
    mobile_phone: [{ required: true, message: "请输入手机信息", trigger: "blur" }],
    company: [{ required: true, message: "请输入公司名称信息", trigger: "blur" }],
    trade: [{ required: true, message: "请输入所属行业信息", trigger: "blur" }],
    position: [{ required: true, message: "请输入职位信息", trigger: "blur" }],
    address3: [{ required: true, message: "请输入公司地址信息", trigger: "blur" }],
    company_type: [{ required: true, message: "请输入公司类型信息", trigger: "blur" }],
    company_email: [{ required: true, message: "请输入公司邮箱信息", trigger: "blur" }],
    company_phone: [{ required: true, message: "请输入公司电话信息", trigger: "blur" }],
    income: [{ required: true, message: "请输入收入信息", trigger: "blur" }],
    contact: [{ required: true, message: "请输入联系人信息", trigger: "blur" }],
    contact_name: [{ required: true, message: "请输入联系人信息", trigger: "blur" }],
    contact_phone: [{ required: true, message: "请输入联系人信息", trigger: "blur" }],
    contact2: [{ required: true, message: "请输入联系人信息", trigger: "blur" }],
    contact2_name: [{ required: true, message: "请输入联系人信息", trigger: "blur" }],
    contact2_phone: [{ required: true, message: "请输入联系人信息", trigger: "blur" }],
    contact2_dep: [{ required: true, message: "请输入联系人信息", trigger: "blur" }],
    contact2_pos: [{ required: true, message: "请输入联系人信息", trigger: "blur" }],
   },
   resetobj: {},
   verification: false
  };
 },
 methods: {
  submitForm(formName) {
   this.$refs[formName].validate(valid => {
    if (valid) {
     LoanInput(this.ruleForm).then(res => {
       if (res.data.code === 20000) {
          this.$notify({
          title: '提示',
          message: '创建成功',
          type: "success"
        })
       } else {
          this.$notify({
          title: '提示',
          message: '创建失败',
          type: "error"
        })
       }
     });
    } else {
     alert("您有必填项未填");
     return false;
    }
   });
  },
  resetForm(formName) {
   this.$refs[formName].resetFields();
  },
  Regular() {
   if (
    !this.form.name ||
    !this.form.identity_card ||
    !this.form.birthday ||
    !this.form.address1 ||
    !this.form.address2 ||
    !this.form.phone ||
    !this.form.mobile_phone ||
    !this.form.company ||
    !this.form.trade ||
    !this.form.contact ||
    !this.form.contact_name ||
    !this.form.contact_phone ||
    !this.form.contact2 ||
    !this.form.contact2_name ||
    !this.form.contact2_phone ||
    !this.form.company_email ||
    !this.form.position ||
    !this.form.address3 ||
    !this.form.company_type ||
    !this.form.company_phone ||
    !this.form.income
   ) {
    this.verification = false;
   } else {
    this.verification = true;
   }
  }
 },
 mounted() {
   this.show = true;
 }
};
</script>
<style scoped>
.el-card {
 margin-top: 20px;
}
</style>