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
          year: '1991',
          value: 15468
        }, {
          year: '1992',
          value: 16100
        }, {
          year: '1993',
          value: 15900
        }, {
          year: '1994',
          value: 17409
        }, {
          year: '1995',
          value: 17000
        }, {
          year: '1996',
          value: 21056
        }, {
          year: '1997',
          value: 26982
        }, {
          year: '1998',
          value: 32040
        }, {
          year: '1999',
          value: 33233
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
          padding: [50],
          background: {
            fill: "#fff"
          }
        })
        chart.source(data);
        chart.scale({
          value: {
            min: 10000,
            alias: "数量"
          },
          year: {
            range: [0, 1]
          }
        });
        chart.axis('value', {
          label: {
            formatter(val) {
              return (val / 10000).toFixed(1) + 'k';
            }
          }
        });
        chart.tooltip({
          crosshairs: {
            type: 'cross'
          }
        });
        chart.area().position('year*value');
        chart.line().position('year*value');
        chart.render();
      },
    }
  }
</script>
