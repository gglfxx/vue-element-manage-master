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
          time: '17 Q1',
          type: '移动游戏',
          value: 0
        }, {
          time: '17 Q1',
          type: '移动购物',
          value: 17.8
        }, {
          time: '17 Q1',
          type: '移动营销',
          value: 69.4
        }, {
          time: '17 Q1',
          type: '共享单车',
          value: 12.8
        }, {
          time: '17 Q2',
          type: '移动游戏',
          value: 0
        }, {
          time: '17 Q2',
          type: '移动购物',
          value: 18.1
        }, {
          time: '17 Q2',
          type: '移动营销',
          value: 70.7
        }, {
          time: '17 Q2',
          type: '共享单车',
          value: 11.2
        }, {
          time: '17 Q3',
          type: '移动游戏',
          value: 12
        }, {
          time: '17 Q3',
          type: '移动购物',
          value: 20.8
        }, {
          time: '17 Q3',
          type: '移动营销',
          value: 57.4
        }, {
          time: '17 Q3',
          type: '共享单车',
          value: 9.8
        }, {
          time: '17 Q4',
          type: '移动游戏',
          value: 0.1
        }, {
          time: '17 Q4',
          type: '移动购物',
          value: 20.3
        }, {
          time: '17 Q4',
          type: '移动营销',
          value: 69.2
        }, {
          time: '17 Q4',
          type: '共享单车',
          value: 10.4
        }, {
          time: '18 Q1',
          type: '移动游戏',
          value: 0.4
        }, {
          time: '18 Q1',
          type: '移动购物',
          value: 17.3
        }, {
          time: '18 Q1',
          type: '移动营销',
          value: 68.3
        }, {
          time: '18 Q1',
          type: '共享单车',
          value: 14
        }, {
          time: '18 Q2',
          type: '移动游戏',
          value: 1.2
        }, {
          time: '18 Q2',
          type: '移动购物',
          value: 18.3
        }, {
          time: '18 Q2',
          type: '移动营销',
          value: 68.6
        }, {
          time: '18 Q2',
          type: '共享单车',
          value: 11.9
        }],
      }
    },
    mounted() {
      this.createChart(this.chartId, this.chartData);
    },
    methods: {
      createChart(container, data) {
        let chart = new G2.Chart({
          container,
          forceFit: true,
          height: this.height,
          padding: 'auto',
          background: {
            fill: "#fff"
          }
        });
        chart.source(data);
        chart.scale("value", {
          formatter(val) {
            return val + '%';
          }
        })
        chart.axis('time', {
          label: {
            textStyle: {
              fill: '#aaa'
            }
          },
          tickLine: {
            length: 0
          }
        });
        chart.legend({
          position: 'right-center'
        });
        chart.intervalStack().position('time*value').color('type', ['#40a9ff', '#1890ff', '#096dd9', '#0050b3'])
          .label('value', function(val) {
            if (val < 10) {
              return false;
            } else {
              return {
                position: 'middle',
                offset: 0,
                textStyle: {
                  fill: '#fff',
                  fontSize: 12,
                },
              };
            }

          });
        chart.render();
      },
    }
  }
</script>
