<template>
  <div class="chart-wrap">
    <el-row :gutter="20">
      <el-col :lg="12" :sm="24">
        <p class="title">基础柱状图</p>
        <chart-base></chart-base>
      </el-col>

      <el-col :lg="12" :sm="24">
        <p class="title">自定义顶部图片</p>
        <chart-custom></chart-custom>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :lg="12" :sm="24">
        <p class="title">分组柱状图1</p>
        <chart-group1></chart-group1>
      </el-col>

      <el-col :lg="12" :sm="24">
        <p class="title">分组柱状图2</p>
        <chart-group2></chart-group2>
      </el-col>
    </el-row>


    <el-row :gutter="20">
      <el-col :lg="12" :sm="24">
        <p class="title">辅助元素</p>
        <chart-guide></chart-guide>
      </el-col>

      <el-col :lg="12" :sm="24">
        <p class="title">瀑布图</p>
        <chart-waterfall></chart-waterfall>
      </el-col>
    </el-row>


    <el-row :gutter="20">
      <el-col :lg="12" :sm="24">
        <p class="title">堆叠柱状图</p>
        <chart-overlay></chart-overlay>
      </el-col>

      <el-col :lg="12" :sm="24">

      </el-col>
    </el-row>


  </div>
</template>

<script>
  import ChartBase from './components/ChartBase';
  import ChartCustom from './components/ChartCustom';
  import ChartGroup1 from './components/ChartGroup1';
  import ChartGroup2 from './components/ChartGroup2';
  import ChartGuide from './components/ChartGuide';
  import ChartWaterfall from './components/ChartWaterfall';
  import ChartOverlay from './components/ChartOverlay';

  export default {
    name: 'PillarChart',
    components: {
      ChartBase,
      ChartCustom,
      ChartGroup1,
      ChartGroup2,
      ChartGuide,
      ChartWaterfall,
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
