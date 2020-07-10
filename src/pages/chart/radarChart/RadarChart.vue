<template>
  <div class="chart-wrap">
    <el-row :gutter="20">
      <el-col :lg="12" :sm="24">
        <p class="title">基础雷达图</p>
        <chart-base :height="500" />
      </el-col>

    </el-row>
  </div>
</template>

<script>
  import ChartBase from './components/ChartBase';


  export default {
    name: 'RadarChart',
    components: {
      ChartBase,

    }
  }
</script>

<style lang="scss" scoped>
  .chart-wrap {
    .title {
      font-size: 16px;
      font-weight: 600;
      text-indent: 2em;
      line-height: 40px;
    }
  }
</style>
