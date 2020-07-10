<template>
  <div class="login">
    <p class="login__header">账号登录</p>

    <el-form class="login__body" ref="loginForm" :model="loginForm" :rules="loginRules" auto-complete="on" label-width="80px" label-position="top">
      <el-form-item label="账号" prop="username">
        <el-input type="text" auto-complete="on" autofocus v-model="loginForm.username" placeholder="请输入账号">
          <svg-icon icon-name="user" slot="prefix" icon-class="icon" />
        </el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input :type="passwordType" auto-complete="on" v-model="loginForm.password" @keyup.enter.native="handleLogin" placeholder="请输入密码">
          <svg-icon icon-name="password" slot="prefix" icon-class="icon" />
          <svg-icon icon-name="eye" slot="suffix" @click.native="showPwd" icon-class="icon icon-eye" />
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-checkbox v-model="loginForm.rememberPwd">记住账号</el-checkbox>
        <div class="register">
          <router-link to="/account/forget">忘记密码?</router-link>
          <span>没有账号?</span>
          <router-link to="/account/register">立即注册</router-link>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :loading="loginLoading" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import { encryptByDES } from '@/utils/crypto';

  export default {
    data() {
      return {
        loginForm: {
          username: 'admin',
          password: '123456',
          rememberPwd: false
        },
        loginRules: {
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
            min: 6,
            message: '密码长度不能少于六位',
            trigger: 'blur'
          }]
        },
        passwordType: 'password',
        loginLoading: false
      };
    },
    methods: {
      showPwd() {
        this.passwordType = this.passwordType == 'password' ? 'text' : 'password';
      },
      handleLogin() {
        this.loginLoading = true;
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            const account = {
              username: this.loginForm.username,
              password: encryptByDES(this.loginForm.password, '123456781111')
            }
            this.$store.dispatch('Login', account).then(() => {
              this.$router.replace('/').catch(err => {});
              this.loginLoading = false;
            }).catch((error) => {
              this.$message.error('登录失败,请填写正确的信息！')
              this.loginLoading = false;
            })
          } else {
            this.$message.error('登录失败,请填写正确的信息！')
            this.loginLoading = false;
          }
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  .login {
    padding: 15px 20px;
    background-color: rgba(255, 255, 255, 0);
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.7);
    border-radius: 10px;

    .login__header {
      font-size: 22px;
      text-align: center;
      color: #fff;
    }

    .login__body {
      .icon {
        color: $primary-text-color;
        font-size: 18px;
      }

      .icon.icon-eye {
        padding-right: 10px;
        cursor: pointer;
      }

      .register {
        float: right;
        color: #fff;
      }
    }
  }
</style>

<style lang="scss">
  .login {
    .el-input--prefix {
      .el-input__prefix {
        left: 10px;
      }

      .el-input__inner {
        padding-left: 35px;
        padding-right: 35px;
      }
    }

    .el-form-item__label,
    .el-checkbox__label {
      color: #fff;
    }

    .el-button {
      display: block;
      width: 100%;
    }
  }
</style>
