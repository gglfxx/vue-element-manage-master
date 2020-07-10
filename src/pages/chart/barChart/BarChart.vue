<template>
  <div class="chart-wrap">
    <el-row :gutter="20">
      <el-col :lg="12" :sm="24">
        <p class="title">基础条形图</p>
        <chart-base></chart-base>
      </el-col>

      <el-col :lg="12" :sm="24">
        <p class="title">分组条形图</p>
        <chart-group></chart-group>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :lg="12" :sm="24">
        <p class="title">堆叠条形图</p>
        <chart-overlay></chart-overlay>
      </el-col>

      <el-col :lg="12" :sm="24">
        <p class="title"></p>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ChartBase from './components/ChartBase';
  import ChartGroup from './components/ChartGroup';
  import ChartOverlay from './components/ChartOverlay';


  export default {
    name: 'BarChart',
    components: {
      ChartBase,
      ChartGroup,
      ChartOverlay
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
