<template>
  <div :id="chartId"></div>
</template>

<script>
  import G2 from '@antv/g2';

  export default {
    props: {
      height: {
        type: Number,
        default: 360
      }
    },
    data() {
      return {
        chartId: 'chart' + +new Date() + ((Math.random() * 1000).toFixed(0) + ''),
        chartData: [{
          week: '星期一',
          value: 54
        }, {
          week: '星期二',
          value: 48
        }, {
          week: '星期三',
          value: 33
        }, {
          week: '星期四',
          value: 67
        }, {
          week: '星期五',
          value: 59
        }, {
          week: '星期六',
          value: 97
        }, {
          week: '星期天',
          value: 75
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
          padding: [30, 60, 50, 65],
          background: {
            fill: '#fff'
          }
        })
        chart.source(data);
        chart.scale({
          week: {
            range: [0, 1]
          },
          value: {
            min: 0,
            alias: '数量'
          }
        })
        chart.axis('value', {
          line: {
            lineWidth: 1,
            stroke: 'rgb(202,202,202)',
          },
          title: {
            textStyle: {
              fill: '#4a4a4a'
            }
          }
        });
        chart.axis('week', {
          tickLine: {
            length: -3
          }
        });
        chart.tooltip({
          crosshairs: {
            type: 'line'
          }
        });
        chart
          .line()
          .position('week*value');
        chart
          .point()
          .position('week*value')
          .size(4)
          .shape('circle')
          .style({
            stroke: '#fff',
            lineWidth: 1
          });
        chart.render();
      },
    }
  }
</script>
