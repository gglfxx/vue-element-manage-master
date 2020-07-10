<template>
  <div class="form-step" :key="pageKey">
    <el-steps :active="stepNumber" align-center>
      <el-step
        v-for="step in steps"
        :key="step.title"
        :title="step.title"
        :description="step.description"
        :status="step.status" />
    </el-steps>

    <step-one v-show="stepNumber === 0" @onNextStep="handleNextStep" />
    <step-two v-show="stepNumber === 1" @onNextStep="handleNextStep" @onPrevStep="handlePrevStep" />
    <step-three v-show="stepNumber === 2" @onAgain="handleAgain" />
  </div>
</template>

<script>
  import StepOne from './components/StepOne';
  import StepTwo from './components/StepTwo';
  import StepThree from './components/StepThree';
  import { deepClone } from '@/utils/core';

  const initSteps = [{
    title: '基本信息',
    status: 'process',
    description: '请填写用户基本信息'
  }, {
    title: '资料上传',
    status: 'wait',
    description: '请上传认证资料'
  }, {
    title: '提交结果',
    status: 'wait'
  }]

  export default {
    name: 'StepForm',
    components: {
      StepOne,
      StepTwo,
      StepThree
    },
    data() {
      return {
        pageKey: 0,
        stepNumber: 0,
        steps: deepClone(initSteps),
      }
    },
    methods: {
      // 下一步
      handleNextStep(result) {
        if (result) {
          this.steps[this.stepNumber].status = 'success';
          this.steps[++this.stepNumber].status = 'process';
        } else {
          this.$message.error('信息有误！');
          this.steps[this.stepNumber].status = 'error';
        }
      },
      // 上一步
      handlePrevStep() {
        this.steps[this.stepNumber].status = 'wait';
        this.steps[--this.stepNumber].status = 'process';
      },
      // 重新填写
      handleAgain() {
        this.pageKey++;
        this.stepNumber = 0;
        this.steps = deepClone(initSteps)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form-step {
    width: 50%;
    min-width: 500px;
    padding: 20px;
    margin: 0 auto;
    border-radius: 10px;
    background-color: #fff;

    .el-steps {
      margin-bottom: 20px;
    }
  }
</style>
