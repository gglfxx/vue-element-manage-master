<template>
  <div class="form-valid">
    <el-form ref="form" :model="formData" :rules="formRule" status-icon label-width="100px">
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="checkPassword">
        <el-input type="password" v-model="formData.checkPassword"></el-input>
      </el-form-item>

      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="formData.age"></el-input>
      </el-form-item>
    </el-form>

    <div style="text-align:center;">
      <el-button type="primary" round @click="handleSubmit" :loading="submitLoading">提交</el-button>
      <el-button round @click="handleReset">重置</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ValidForm',
    data() {
      const validatePass = (rule, value, callback) => {
        if (!/\d/.test(value) || !/[a-zA-Z]/.test(value)) {
          callback(new Error('密码至少要包含数字和字母'));
        } else {
          if (this.formData.checkPassword !== '') {
            this.$refs.form.validateField('checkPassword');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value !== this.formData.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      const validateAge = (rule, value, callback) => {
        if (value < 18) {
          callback(new Error('必须年满18岁'));
        } else {
          callback();
        }
      };
      return {
        formData: {
          password: '',
          checkPassword: '',
          age: ''
        },
        formRule: {
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }, {
            min: 6,
            max: 20,
            message: '密码长度为6~20位',
            trigger: 'blur'
          }, {
            validator: validatePass,
            trigger: 'blur'
          }],
          checkPassword: [{
            required: true,
            message: '请再次输入密码',
            trigger: 'blur'
          }, {
            validator: validatePass2,
            trigger: 'blur'
          }],
          age: [{
            required: true,
            message: '请输入年龄',
            trigger: 'blur'
          }, {
            type: 'number',
            message: '年龄需要为数字'
          }, {
            validator: validateAge,
            trigger: 'blur'
          }]
        },
        submitLoading: false
      };
    },
    methods: {
      handleSubmit() {
        this.submitLoading = true;
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$message.success('提交成功！');
          } else {
            this.$message.error('请按正确格式填写！');
          }
        })
        this.submitLoading = false;
      },
      handleReset() {
        this.$refs.form.resetFields();
      }
    },
  }
</script>

<style scoped>
  .form-valid {
    width: 40%;
    min-width: 500px;
    padding: 20px;
    margin: 0 auto;
    border-radius: 20px;
    background-color: #fff;
  }
</style>
