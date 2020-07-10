<template>
  <div class="form-stepthree">
    <i class="el-icon-success icon"></i>
    <p class="title">提交成功</p>
    <div class="remind">请等待工作人员审核，审核结果预计2~3个工作日以短信方式通知。请等待工作人员审核，审核结果预计2~3个工作日以短信方式通知。请等待工作人员审核，审核结果预计2~3个工作日以短信方式通知。</div>

    <div class="button">
      <el-button type="primary" @click="handleAgain">重新填写</el-button>
      <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      handleAgain() {
        this.$emit('onAgain');
      }
    },
  }
</script>


<style lang="scss" scoped>
  .form-stepthree {
    text-align: center;

    .icon {
      font-size: 60px;
      color: #67c23a;
    }

    .title {
      font-size: 24px;
      line-height: 50px;
    }

    .remind {
      width: 440px;
      padding: 1em;
      margin: 0 auto;
      border: 1px dotted #ccc;
      line-height: 22px;
      text-indent: 2em;
      text-align: left;
    }

    .button {
      margin-top: 20px;
      text-align: center;
    }
  }
</style>
