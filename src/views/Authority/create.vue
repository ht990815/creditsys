<template>
  <transition name="fade">
    <div v-show="show">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="ruleForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <span>权限分配：</span>
      <el-radio v-model="ruleForm.role_id" label="1">初审人员</el-radio>
      <el-radio v-model="ruleForm.role_id" label="2">销售人员</el-radio>
      <el-form-item style="margin-top:10px;">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
  </transition>
</template>

<script>
import { CreateUser } from "@/utils/api";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      show: false,
      ruleForm: {
        password: "",
        checkPass: "",
        account: "",
        role_id: "1"
      },
      rules: {
        account: [{ required: true, message: "不允许为空" }],
        password: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [{ required: true, validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      let self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          CreateUser(this.ruleForm).then(res => {
            console.log(res)
            if (res.data.code === 20000) {
              self.$message.success("创建成功！");
            }
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    this.show = true
  }
};
</script>