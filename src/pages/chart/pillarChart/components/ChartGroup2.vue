<template>
  <div :id="chartId"></div>
</template>

<script>
  import G2 from "@antv/g2";
  export default {
    props: {
      height: {
        type: Number,
        default: 360
      }
    },
    data() {
      return {
        chartId: "chart" + +new Date() + ((Math.random() * 1000).toFixed(0) + ""),
        chartData: [{
          company: '服装销售额',
          type: '第一季度',
          value: 120012
        }, {
          company: '化妆品销售额',
          type: '第一季度',
          value: 21331
        }, {
          company: '电器销售额',
          type: '第一季度',
          value: 32142
        }, {
          company: '服装销售额',
          type: '第二季度',
          value: 90012
        }, {
          company: '化妆品销售额',
          type: '第二季度',
          value: 31331
        }, {
          company: '电器销售额',
          type: '第二季度',
          value: 25142
        }, {
          company: '服装销售额',
          type: '第三季度',
          value: 80012
        }, {
          company: '化妆品销售额',
          type: '第三季度',
          value: 28331
        }, {
          company: '电器销售额',
          type: '第三季度',
          value: 36142
        }, {
          company: '服装销售额',
          type: '第四季度',
          value: 150012
        }, {
          company: '化妆品销售额',
          type: '第四季度',
          value: 41331
        }, {
          company: '电器销售额',
          type: '第四季度',
          value: 53248
        }],
      }
    },
    mounted() {
      this.createChart(this.chartId, this.chartData);
    },
    methods: {
      createChart(container, data) {
        let chart = new G2.Chart({
          container: container,
          forceFit: true,
          height: this.height,
          padding: [50, 50, 50, 100],
          background: {
            fill: "#fff"
          }
        })
        chart.source(data);
        chart.scale('value', {
          alias: '销售额（元）',
        });
        chart.axis('type', {
          label: {
            textStyle: {
              fill: '#aaa'
            }
          },
          tickLine: {
            length: 0
          }
        });

        chart.axis('value', {
          label: {
            textStyle: {
              fill: '#aaa'
            },
            formatter: (val) => (val / 1000) + 'k'
          },
          title: {
            offset: 80
          }
        });
        chart.legend({
          position: 'top-center'
        });
        // 如果不对数据进行调整，将形成为堆叠柱状图
        chart
          .interval()
          .position('type*value')
          .color('company')
          .adjust([{
            type: 'dodge',
            marginRatio: 0.02
          }]);
        chart.render();
      },
    }
  }
</script>
