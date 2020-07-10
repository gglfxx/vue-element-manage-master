<template>
  <div class="chart-wrap">

    <el-row :gutter="20">
      <el-col :lg="12" :sm="24">
        <p class="title">基础饼状图</p>
        <chart-base></chart-base>
      </el-col>

      <el-col :lg="12" :sm="24">
        <p class="title">内部的label</p>
        <chart-label></chart-label>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :lg="12" :sm="24">
        <p class="title">扇形</p>
        <chart-fan></chart-fan>
      </el-col>

      <el-col :lg="12" :sm="24">
        <p class="title">自定义标签</p>
        <chart-custom></chart-custom>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :lg="12" :sm="24">
        <p class="title">花瓣图</p>
        <chart-petal></chart-petal>
      </el-col>

      <el-col :lg="12" :sm="24">
        <p class="title">玫瑰图</p>
        <chart-rose></chart-rose>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :lg="12" :sm="24">
        <p class="title">纹理</p>
        <chart-texture></chart-texture>
      </el-col>

      <el-col :lg="12" :sm="24">
        <p class="title">三角形</p>
        <chart-triangle></chart-triangle>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :lg="12" :sm="24">
        <p class="title">其他分类占比较小</p>
        <chart-special :height="460"></chart-special>
      </el-col>

      <el-col :lg="12" :sm="24">
        <p class="title">环形图1</p>
        <chart-circle1 :height="460"></chart-circle1>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :lg="12" :sm="24">
        <p class="title">环形图2</p>
        <chart-circle2></chart-circle2>
      </el-col>

      <el-col :lg="12" :sm="24">
        <p class="title">环形图3</p>
        <chart-circle3></chart-circle3>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :lg="12" :sm="24">
        <p class="title">环形图4</p>
        <chart-circle4></chart-circle4>
      </el-col>

      <el-col :lg="12" :sm="24">
        <p class="title">环形图5</p>
        <chart-circle5></chart-circle5>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :lg="12" :sm="24">
        <p class="title">环形图6</p>
        <chart-circle6></chart-circle6>
      </el-col>

      <el-col :lg="12" :sm="24">

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ChartBase from './components/ChartBase';
  import ChartLabel from './components/ChartLabel';
  import ChartFan from './components/ChartFan';
  import ChartCustom from './components/ChartCustom';
  import ChartPetal from './components/ChartPetal';
  import ChartRose from './components/ChartRose';
  import ChartTexture from './components/ChartTexture';
  import ChartTriangle from './components/ChartTriangle';
  import ChartSpecial from './components/ChartSpecial';
  import ChartCircle1 from './components/ChartCircle1';
  import ChartCircle2 from './components/ChartCircle2';
  import ChartCircle3 from './components/ChartCircle3';
  import ChartCircle4 from './components/ChartCircle4';
  import ChartCircle5 from './components/ChartCircle5';
  import ChartCircle6 from './components/ChartCircle6';

  export default {
    name: "PieChart",
    components: {
      ChartBase,
      ChartLabel,
      ChartFan,
      ChartCustom,
      ChartPetal,
      ChartRose,
      ChartTexture,
      ChartTriangle,
      ChartSpecial,
      ChartCircle1,
      ChartCircle2,
      ChartCircle3,
      ChartCircle4,
      ChartCircle5,
      ChartCircle6
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
