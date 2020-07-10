<template>
  <el-form
    ref="form"
    :model="formData"
    :rules="formRule"
    status-icon
    label-width="80px"
    label-position="left">

    <el-form-item label="字段1" prop="value1">
      <el-input v-model="formData.value1" clearable placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item label="字段2" prop="value2">
      <el-input v-model="formData.value2" clearable placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item label="字段3" prop="value3">
      <el-input v-model="formData.value3" clearable placeholder="请输入"></el-input>
    </el-form-item>

    <div style="text-align:center;">
      <el-button type="primary" @click="handleNextStep">下一步</el-button>
    </div>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        formData: {
          value1: '',
          value2: '',
          value3: ''
        },
        formRule: {
          value1: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          value2: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          value3: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }]
        },
      }
    },
    methods: {
      validForm() {
        let result = true;
        this.$refs.form.validate(valid => {
          if (!valid) {
            result = false;
          }
        })
        return result;
      },
      handleNextStep() {
        this.$emit('onNextStep', this.validForm())
      }
    },
  }
</script>
