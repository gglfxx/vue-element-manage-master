<template>
  <el-row class="dashboard-line-chart" :gutter="30">
    <el-col :lg="12" :sm="24">
      <p class="title">周{{chartName}}增长趋势图</p>
      <div id="weekChartContainer"></div>
    </el-col>

    <el-col :lg="12" :sm="24">
      <p class="title">月{{chartName}}增长趋势图</p>
      <div id="monthChartContainer"></div>
    </el-col>
  </el-row>
</template>

<script>
  import G2 from '@antv/g2';
  import api from '@/api';

  const TYPE_NAME_MAP = {
    visite: '访问量',
    user: '用户数量',
    goods: '商品数量',
    comment: '评论数量'
  };

  export default {
    props: ['statisticType'],
    data() {
      return {
        chartName: '访问量',
        chartType: 'visite',
        weekChart: {},
        monthChart: {},
        weekData: {},
        monthData: {}
      };
    },
    computed: {
      sideCollapse() {
        return this.$store.getters.sideCollapse;
      },
    },
    watch: {
      // 折叠或展开菜单栏的时候，图表宽度不会跟着变，需要重建。
      sideCollapse() {
        // Dashboard页面使用keep-alive做了缓存，如果当前不在Dashbord页面，折叠/展开菜单会出现container不存在的情况
        if (this.$route.path === '/dashboard/index') {
          const timer = setTimeout(() => {
            this.weekChart.destroy();
            this.monthChart.destroy();
            this.createChart('weekChartContainer', this.weekData[this.chartType], 'weekChart');
            this.createChart('monthChartContainer', this.monthData[this.chartType], 'monthChart');
          }, 350)
        }
      },
      // 点击数量统计信息的时候，图表展现对应的数据
      statisticType(value) {
        this.chartType = value;
        this.chartName = TYPE_NAME_MAP[value];
        this.weekChart.changeData(this.weekData[value]);
        this.monthChart.changeData(this.monthData[value]);
      }
    },
    mounted() {
      this.getLineChartData(() => {
        this.setDate(this.weekData, this.monthData);
        this.createChart('weekChartContainer', this.weekData[this.chartType], 'weekChart');
        this.createChart('monthChartContainer', this.monthData[this.chartType], 'monthChart');
      });
    },
    methods: {
      // 获取图表数据
      async getLineChartData(callback) {
        const getWeekData = () => {
          return api.dashboard.getLineChartData({ type: 'week' });
        }
        const getMonthData = () => {
          return api.dashboard.getLineChartData({ type: 'month' });
        }
        const [weekData, monthData] = await Promise.all([getWeekData(), getMonthData()]);
        this.weekData = weekData;
        this.monthData = monthData;
        callback();
      },
      // 为数据添加日期参数
      setDate(weekData, monthData) {
        const currentDate = Date.now();
        const ONE_DAY = 24 * 60 * 60 * 1000;
        Object.values(weekData).forEach(item => {
          item.forEach((item1, index) => {
            const date = new Date(currentDate - (6 - index) * ONE_DAY);
            item1.date = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
          })
        })
        Object.values(monthData).forEach(item => {
          item.forEach((item1, index) => {
            // 设置31天的数据，以满足每格显示5天。
            const date = new Date(currentDate - (30 - index) * ONE_DAY);
            item1.date = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
          })
        })
      },
      // 创建图表
      createChart(container, data, chartName) {
        const chart = new G2.Chart({
          container,
          forceFit: true,
          height: 300,
          padding: [30, 60, 50, 50],
          background: { fill: '#fff' }
        });
        chart.source(data);
        chart.scale({
          value: { alias: '数量', min: 0 }
        });
        chart.line().position('date*value');
        chart.point().position('date*value').size(4).shape('circle').style({
          stroke: '#fff',
          lineWidth: 1
        });
        chart.render();
        this[chartName] = chart;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .dashboard-line-chart {
    margin-bottom: 20px;

    .title {
      font-size: 16px;
      text-align: center;
      margin-bottom: 10px;
    }

    #weekChartContainer,
    #monthChartContainer {
      height: 300px;
      background-color: #fff;
    }

  }
</style>
