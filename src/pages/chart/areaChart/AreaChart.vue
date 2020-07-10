<template>
  <div class="chart-wrap">
    <el-row :gutter="20">
      <el-col :lg="12" :sm="24">
        <p class="title">基础面积图</p>
        <chart-base></chart-base>
      </el-col>

      <el-col :lg="12" :sm="24">
        <p class="title">负值</p>
        <chart-negative></chart-negative>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :lg="12" :sm="24">
        <p class="title">标记</p>
        <chart-maker></chart-maker>
      </el-col>

      <el-col :lg="12" :sm="24">
        <p class="title">分段</p>
        <chart-region></chart-region>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :lg="12" :sm="24">
        <p class="title">堆叠面积图</p>
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
  import ChartNegative from './components/ChartNegative';
  import ChartMaker from './components/ChartMaker';
  import ChartRegion from './components/ChartRegion';
  import ChartOverlay from './components/ChartOverlay';

  export default {
    name: 'LineChart',
    components: {
      ChartBase,
      ChartNegative,
      ChartMaker,
      ChartRegion,
      ChartOverlay,
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
