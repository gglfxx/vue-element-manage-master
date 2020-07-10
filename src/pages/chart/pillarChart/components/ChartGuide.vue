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
          name: '绝云',
          value: 1256
        }, {
          name: '米法',
          value: 2108
        }, {
          name: '再飞',
          value: 1780
        }, {
          name: '青湳',
          value: 2254
        }, {
          name: '有田',
          value: 1233
        }, {
          name: '十吾',
          value: 1180
        }, {
          name: '象数',
          value: 1455
        }, {
          name: '顾倾',
          value: 372
        }, {
          name: '画康',
          value: 243
        }, {
          name: '完白',
          value: 1193
        }]
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
          padding: [20, 20, 50, 50],
          background: {
            fill: "#fff"
          }
        });
        chart.source(data);
        chart.scale('value', {
          alias: '行数(万)'
        });
        chart.axis('name', {
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
          label: null,
          title: {
            offset: 30
          }
        });
        chart.guide().regionFilter({
          top: true,
          start: ['start', 'max'],
          end: ['end', 1440],
          color: '#FF4D4F'
        });
        chart.guide().line({
          top: true,
          start: ['start', 1440],
          end: ['end', 1440],
          lineStyle: {
            stroke: '#595959',
            lineWidth: 1,
            lineDash: [3, 3]
          },
          text: {
            position: 'start',
            style: {
              fill: '#595959',
              fontSize: 12,
              fontWeight: 300
            },
            content: '公司平均 14,40',
            offsetY: -5
          }
        });
        chart.interval().position('name*value').label('value', {
          textStyle(val) {
            let value = parseInt(val);
            let style = {
              fill: '#595959',
              fontWeight: 'normal',
              fontSize: 12
            };
            if (value > 1440) {
              style.fontWeight = 'bold';
            }
            return style;
          },
          offset: 2
        });
        chart.render();
      },
    }
  }
</script>
