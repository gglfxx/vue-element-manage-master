<template>
  <el-card class="dashboard-progress">
    <div slot="header">
      <span class="dashboard-progress__header">项目进度</span>
    </div>
    <div class="progress-item">
      <p>项目一</p>
      <el-progress :percentage="10" color="#409eff"></el-progress>
    </div>
    <div class="progress-item">
      <p>项目二</p>
      <el-progress :percentage="70"></el-progress>
    </div>
    <div class="progress-item">
      <p>项目三</p>
      <el-progress :percentage="80" color="#8e71c7"></el-progress>
    </div>
    <div class="progress-item">
      <p>项目四</p>
      <el-progress :percentage="100" status="success"></el-progress>
    </div>
  </el-card>

</template>

<script>
  export default {
    data() {
      return {

      }
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard-progress {
    .dashboard-progress__header {
      font-size: 16px;
    }
  }
</style>
