<template>
  <div class="mine">
    <el-form
      :model="userInfo"
      :rules="rules"
      ref="userInfo"
      label-width="70px">
      <el-form-item label="姓名：" prop="name">
        <el-input v-model="userInfo.name"></el-input>
      </el-form-item>

      <el-form-item label="角色：">
        <el-select v-model="userInfo.roles" multiple disabled placeholder="请选择用户角色">
          <el-option v-for="item in tableMng.getTable('role')" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="性别：" prop="gender">
        <el-radio-group v-model="userInfo.gender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="头像：">
        <avatar-upload
          v-model="userInfo.avatar"
          action="https://sm.ms/api/v2/upload"
          name="smfile" />
      </el-form-item>

      <el-row>
        <el-col :span="12">
          <el-form-item label="手机:" placeholder="请填写手机号" prop="mobilePhone">
            <el-input v-model="userInfo.mobilePhone" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱:" placeholder="请填写邮箱地址" prop="email">
            <el-input v-model="userInfo.email" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-button type="primary" round :loading="submitLoading" @click="handleSubmit">提交</el-button>

  </div>
</template>
<script>
  import tableMng from '@/utils/tableMng';
  import AvatarUpload from '@/components/upload/avatarUpload';

  export default {
    name: 'Mine',
    components: {
      AvatarUpload
    },
    data() {
      return {
        tableMng,
        rules: {
          name: [{
            required: true,
            message: '请填写姓名',
            trigger: 'blur'
          }, {
            max: 6,
            message: '姓名长度不能超过6个字',
            trigger: 'blur'
          }],
          gender: [{
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }],

          mobilePhone: [{
            required: true,
            message: '请填写手机号',
            trigger: 'blur'
          }, {
            pattern: /^1[345789]\d{9}$/,
            message: '手机号码格式不正确',
            trigger: 'blur'
          }],
          email: [{
            type: 'email',
            message: '邮箱格式不正确',
            trigger: 'blur'
          }],
        },
        submitLoading: false
      }
    },
    computed: {
      userInfo() {
        return this.$store.getters.userInfo;
      }
    },
    methods: {
      handleSubmit() {
        this.submitLoading = true;
        this.$refs.userInfo.validate(valid => {
          if (valid) {
            this.$message.success("更新成功");
          } else {}
          this.submitLoading = false;
        });
      }
    }
  }
</script>
<style lang="scss" scoped>
  .mine {
    width: 50%;
    min-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;

    .el-button {
      display: block;
      margin: 0 auto
    }
  }
</style>
