<template>
  <div class="register">
    <p class="register__header">账号注册</p>
    <el-form class="register__body" ref="form" :model="accountInfo" :rules="accountRules" auto-complete="on" label-width="80px">
      <el-form-item label="账号" prop="username">
        <el-input v-model="accountInfo.username" placeholder="请输入账号"> </el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="accountInfo.password" type="password" placeholder="请输入密码"> </el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="checkPassword">
        <el-input v-model="accountInfo.checkPassword" type="password" placeholder="请再次输入密码"> </el-input>
      </el-form-item>

      <el-form-item label="手机号" prop="phone">
        <el-input v-model="accountInfo.phone" placeholder="请填写手机号码"></el-input>
      </el-form-item>

      <el-form-item label="验证码" prop="captcha">
        <el-row>
          <el-col :span="12">
            <el-input v-model="accountInfo.captcha" placeholder="请输入短信验证码"></el-input>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-button style="width:100%" @click="getCaptcha" :disabled="captchaLoading">{{captchaButtonText}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item>
        <el-col :span="11">
          <el-button style="width:100%" type="primary" :loading="registerLoading" @click="handleRegister">注册</el-button>
        </el-col>
        <el-col :span="11" :offset="2">
          <router-link to="/account/login">使用已有账号登录</router-link>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import api from '@/api';

  export default {
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!/\d/.test(value) || !/[a-zA-Z]/.test(value)) {
          callback(new Error('密码至少要包含数字和字母'));
        } else {
          if (this.accountInfo.checkPassword !== '') {
            this.$refs.form.validateField('checkPassword');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.accountInfo.password) {
          callback(new Error('两次填写的密码不一致'));
        } else {
          callback();
        }
      };
      return {
        registerLoading: false,
        captchaLoading: false,
        captchaButtonText: '获取验证码',
        accountInfo: {
          username: '',
          password: '',
          checkPassword: '',
          phone: '',
          captcha: ''
        },
        accountRules: {
          username: [{
            required: true,
            message: '账号不能为空',
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
          phone: [{
            required: true,
            message: '请填写手机号',
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
          }]
        }
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
      //获取验证码
      async getCaptcha() {
        if (!this.validPhone(this.accountInfo.phone)) return;

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

        await api.account.getCaptcha({ phone: this.accountInfo.phone });
        this.$message.success(`验证码已发送至手机${ this.accountInfo.phone }，请注意查收！`);
      },
      handleRegister() {
        this.registerLoading = true;
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            await api.account.register(this.accountInfo);
            this.$message.success('注册成功！');
            this.$store.dispatch('Login', {
              username: this.accountInfo.username,
              password: this.accountInfo.password
            }).then(() => {
              this.$router.replace('/');
              this.registerLoading = false;
            })
          } else {
            this.$message.warning('请按正确格式填写信息');
            this.registerLoading = false;
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .register {
    padding: 15px 20px;
    background-color: rgba(255, 255, 255, 0);
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.7);
    border-radius: 10px;

    .register__header {
      font-size: 22px;
      text-align: center;
      color: #fff;
    }

    .register__body {
      margin-top: 20px;
    }
  }
</style>

<style lang="scss">
  .register {

    .el-form-item__label {
      color: #fff;
    }
  }
</style>
