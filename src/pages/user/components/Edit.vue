<template>
  <el-dialog
    class="user-edit"
    :title="id ? '编辑用户' : '新增用户'"
    width="700px"
    :visible="visible"
    :before-close="handleBeforeClose">
    <el-form
      ref="form"
      :model="userInfo"
      :rules="formRules"
      label-width="70px"
      v-loading="getDetailLoading">
      <el-form-item label="账号:" prop="account">
        <el-input v-model="userInfo.account" placeholder="请填写账号" clearable :disabled="id ? true : false"></el-input>
      </el-form-item>
      <el-form-item label="姓名:" prop="name">
        <el-input v-model="userInfo.name" placeholder="请填写用户姓名" clearable></el-input>
      </el-form-item>

      <el-form-item label="角色:" prop="roles">
        <el-select v-model="userInfo.roles" multiple placeholder="请选择用户角色">
          <el-option v-for="item in tableMng.getTable('role')" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="性别:">
        <el-radio-group v-model="userInfo.gender">
          <el-radio v-for="item in tableMng.getTable('gender')" :key="item.id" :label="item.id">{{item.name}}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="头像:">
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

    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" :loading="submitLoading" @click="handleSubmit">提 交</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import api from '@/api';
  import tableMng from '@/utils/tableMng';
  import AvatarUpload from '@/components/upload/avatarUpload';

  const defaultInfo = {
    id: '',
    account: '',
    name: '',
    roles: [],
    gender: '',
    avatar: '',
    mobilePhone: '',
    email: ''
  }

  export default {
    props: {
      id: {
        type: String,
        default: ''
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    components: {
      AvatarUpload
    },
    watch: {
      visible(value) {
        if (value) {
          this.getDetail();
        }
      }
    },
    data() {
      return {
        tableMng,
        userInfoBackup: { ...defaultInfo },
        userInfo: { ...defaultInfo },
        formRules: {
          account: [{
            required: true,
            message: '请填写账号',
            trigger: 'blur'
          }, {
            pattern: /^[a-zA-Z0-9_]{5,10}$/,
            message: '账号为5到10位的字母、数字或下划线组成',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '请填写姓名',
            trigger: 'blur'
          }, {
            max: 6,
            message: '姓名长度不能超过6个字',
            trigger: 'blur'
          }],
          roles: [{
            required: true,
            message: '请选择角色',
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
          }]
        },
        submitLoading: false,
        getDetailLoading: false
      }
    },
    methods: {
      async getDetail() {
        if (!this.id) return;
        this.getDetailLoading = true;
        const data = await api.user.getDetail({ id: this.id });
        this.userInfo = { ...data };
        this.userInfoBackup = { ...data };
        this.getDetailLoading = false;
      },
      handleSubmit() {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            this.submitLoading = true;
            await api.user.update({ detail: this.userInfo });
            this.submitLoading = false;
            this.handleClose();
            this.$emit('onSave');
            this.$message.success('提交成功');
          } else {
            this.$message.error('请按照正确格式填写');
          }
        });
      },
      handleBeforeClose() {
        if (window.JSON.stringify(this.userInfoBackup) === window.JSON.stringify(this.userInfo)) {
          this.handleClose();
        } else {
          this.$confirm('信息修改后未提交，确认关闭？', '提示', {
            type: 'warning',
          }).then(() => {
            this.handleClose();
          }).catch(() => {})
        }
      },
      handleClose() {
        this.$refs.form.resetFields();
        this.userInfo = defaultInfo;
        this.userInfoBackup = defaultInfo;
        this.$emit('onClose');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user-edit {}
</style>
