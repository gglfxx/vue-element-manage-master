<template>
  <!-- 忘记密码 -->
  <div class="forget">
    <p class="forget__header">忘记密码</p>

    <el-form class="forget__body" ref="form" :model="formData" :rules="rules" label-width="80px">

      <el-form-item label="新密码" prop="password">
        <el-input v-model="formData.password" type="password" placeholder="6~20位数字、字母、符号组合"></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="checkPassword">
        <el-input v-model="formData.checkPassword" type="password" placeholder="请再次输入密码确认" @keyup.enter.native="submit"></el-input>
      </el-form-item>


      <el-form-item label="手机号" prop="phone">
        <el-input v-model="formData.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>

      <el-form-item label="验证码" prop="captcha">
        <el-row>
          <el-col :span="12">
            <el-input v-model="formData.captcha" placeholder="请输入短信验证码"></el-input>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-button style="width:100%" @click="getCaptcha" :disabled="captchaLoading">{{captchaButtonText}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item>
        <el-row>
          <el-col :span="11">
            <el-button style="width:100%" type="primary" :loading="submitLoading" @click="handleSubmit">确认</el-button>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-button style="width:100%" type="info" @click="handleCancel">取消 </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

  </div>

</template>

<script>
  import api from '@/api';

  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!/\d/.test(value) || !/[a-zA-Z]/.test(value)) {
          callback(new Error('密码至少要包含数字和字母！'));
        } else {
          if (this.formData.checkPassword !== '') {
            this.$refs.form.validateField('checkPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formData.password) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      };
      return {
        formData: {
          phone: '',
          captcha: '',
          password: '',
          checkPassword: ''
        },
        rules: {
          phone: [{
            required: true,
            message: '手机号码不能为空',
            trigger: 'blur'
          }, {
            pattern: /^1[345789]\d{9}$/,
            message: '手机号码格式不正确',
            trigger: 'blur'
          }],
          captcha: [{
            required: true,
            message: '请填写验证码',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }, {
            validator: validatePass,
            trigger: 'blur'
          }, {
            min: 6,
            max: 20,
            message: '密码长度为6~20位',
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
        },
        submitLoading: false,
        captchaLoading: false,
        captchaButtonText: '获取验证码'
      }
    },
    methods: {
      // 设置获取验证码按钮的默认状态
      setDefaultCaptchaButton(timer) {
        clearInterval(timer);
        this.captchaLoading = false;
        this.captchaButtonText = '获取验证码';
      },
      // 校验手机号
      validPhone(phone) {
        if (!phone.match(/^1[345789]\d{9}$/)) {
          this.$message.error('请填写正确的手机号！');
          return false;
        }
        return true
      },
      // 获取验证码
      async getCaptcha() {
        if (!this.validPhone(this.formData.phone)) return;

        // 倒计时
        this.captchaLoading = true;
        let totalTime = 60;
        let timer = null;
        timer = setInterval(() => {
          totalTime--;
          if (totalTime > 0) {
            this.captchaButtonText = `获取验证码(${totalTime}s)`;
          } else {
            this.setDefaultCaptchaButton(timer);
          }
        }, 1000);

        await api.account.getCaptcha({ phone: this.formData.phone });
        this.$message.success(`验证码已发送至手机${ this.formData.phone }，请注意查收！`);
      },
      // 提交
      handleSubmit() {
        this.submitLoading = true;
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            const formData = this.formData;
            await api.account.modifyPassword(this.formData);
            this.$message.success('修改成功,请使用新密码进行登录');
            this.$router.replace('/');
            this.submitLoading = false;
          } else {
            this.$message.warning('请按正确格式填写信息');
            this.submitLoading = false;
          }
        });
      },
      handleCancel() {
        this.$router.push('/account/login');
      }
    }
  };
</script>

<style lang="scss" scoped>
  .forget {
    padding: 15px 20px;
    background-color: rgba(255, 255, 255, 0);
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.7);
    border-radius: 10px;

    .forget__header {
      font-size: 22px;
      text-align: center;
      color: #fff;
    }

    .forget__body {
      margin-top: 20px;
    }
  }
</style>

<style lang="scss">
  .forget {

    .el-form-item__label,
    .el-checkbox__label {
      color: #fff;
    }
  }
</style>
