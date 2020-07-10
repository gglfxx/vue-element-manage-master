<template>
  <div :id="chartId"></div>
</template>

<script>
  import G2 from "@antv/g2";
  import {
    DataSet
  } from '@antv/data-set';
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
          name: '狮子',
          type: '火象星座',
          value: 11
        }, {
          name: '白羊',
          type: '火象星座',
          value: 10
        }, {
          name: '射手',
          type: '火象星座',
          value: 10
        }, {
          name: '水瓶',
          type: '风向星座',
          value: 14
        }, {
          name: '双子',
          type: '风向星座',
          value: 7
        }, {
          name: '天平',
          type: '风向星座',
          value: 7
        }, {
          name: '摩羯',
          type: '土象星座',
          value: 14
        }, {
          name: '金牛',
          type: '土象星座',
          value: 3
        }, {
          name: '处女',
          type: '土象星座',
          value: 3
        }, {
          name: '天蝎',
          type: '水象星座',
          value: 11
        }, {
          name: '巨蟹',
          type: '水象星座',
          value: 5
        }, {
          name: '双鱼',
          type: '水象星座',
          value: 5
        }],
      }
    },
    mounted() {
      this.createChart(this.chartId, this.chartData);
    },
    methods: {
      createChart(container, data) {
        let ds = new DataSet();
        let dv = ds.createView();
        dv.source(data).transform({
          type: 'percent',
          field: 'value',
          dimension: 'type',
          as: 'percent'
        });

        let chart = new G2.Chart({
          container: container,
          forceFit: true,
          height: this.height,
          padding: [50, 0],
          background: {
            fill: "#fff"
          }
        })
        chart.source(dv);
        chart.legend(false);
        chart.coord('theta', {
          radius: 0.7,
          innerRadius: 0.3
        });
        chart
          .intervalStack()
          .position('percent')
          .color('type', ['#1890ff', '#13c2c2', '#ffc53d', '#73d13d'])
          .style({
            stroke: 'white',
            lineWidth: 1
          })
          .label('type', {
            offset: -5,
            textStyle: {
              fill: 'white',
              shadowBlur: 2,
              shadowColor: 'rgba(0, 0, 0, .45)'
            }
          });

        let outterView = chart.view();
        let ds2 = new DataSet();
        let dv2 = ds2.createView();
        dv2.source(data).transform({
          type: 'percent',
          field: 'value',
          dimension: 'name',
          as: 'percent'
        });
        outterView.source(dv2);
        outterView.coord('theta', {
          innerRadius: 0.7 / 1,
          radius: 1
        });
        outterView
          .intervalStack()
          .position('percent')
          .color('type', ['#1890ff', '#13c2c2', '#ffc53d', '#73d13d'])
          .style({
            stroke: 'white',
            lineWidth: 1
          })
          .label('name', {
            offset: -10,
            textStyle: {
              fill: 'white',
              shadowBlur: 2,
              shadowColor: 'rgba(0, 0, 0, .45)'
            }
          }).opacity(1);
        chart.render();
      },
    }
  }
</script>
