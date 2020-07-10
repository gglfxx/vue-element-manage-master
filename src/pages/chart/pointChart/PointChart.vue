<template>
  <div class="chart-wrap">
    <div>
      <p class="title">散点图</p>
      <chart-base></chart-base>
    </div>

    <div>
      <p class="title">气泡图</p>
      <chart-bubble></chart-bubble>
    </div>

  </div>
</template>

<script>
  import ChartBase from './components/ChartBase';
  import ChartBubble from './components/ChartBubble';

  export default {
    name: 'PointChart',
    components: {
      ChartBase,
      ChartBubble,
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
