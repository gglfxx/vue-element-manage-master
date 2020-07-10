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
          value: 251,
          type: '大类一',
          name: '小类一'
        }, {
          value: 1048,
          type: '大类一',
          name: '小类二'
        }, {
          value: 610,
          type: '大类二',
          name: '小类三'
        }, {
          value: 434,
          type: '大类二',
          name: '小类四'
        }, {
          value: 335,
          type: '大类三',
          name: '小类五'
        }, {
          value: 250,
          type: '大类三',
          name: '小类六'
        }],
      }
    },
    mounted() {
      this.createChart(this.chartId, this.chartData);
    },
    methods: {
      createChart(container, data) {
        let DataView = DataSet.DataView;
        // 通过 DataSet 计算百分比
        let dv = new DataView();
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
        chart.source(dv, {
          percent: {
            formatter(val) {
              val = (val * 100).toFixed(2) + '%';
              return val;
            }
          }
        });
        chart.coord('theta', {
          radius: 0.5
        });
        chart.tooltip({
          showTitle: false
        });
        chart.legend(false);
        chart.intervalStack().position('percent').color('type').label('type', {
          offset: -10
        }).tooltip('name*percent', function(item, percent) {
          percent = (percent * 100).toFixed(2) + '%';
          return {
            name: item,
            value: percent
          };
        }).select(false).style({
          lineWidth: 1,
          stroke: '#fff'
        });
        let outterView = chart.view();
        let dv2 = new DataView();
        dv2.source(data).transform({
          type: 'percent',
          field: 'value',
          dimension: 'name',
          as: 'percent'
        });
        outterView.source(dv2, {
          percent: {
            formatter: function formatter(val) {
              val = (val * 100).toFixed(2) + '%';
              return val;
            }
          }
        });
        outterView.coord('theta', {
          innerRadius: 0.5 / 0.75,
          radius: 0.75
        });
        outterView.intervalStack().position('percent').color('name', ['#BAE7FF', '#7FC9FE', '#71E3E3',
          '#ABF5F5', '#8EE0A1',
          '#BAF5C4'
        ]).label('name').tooltip('name*percent', function(item, percent) {
          percent = (percent * 100).toFixed(2) + '%';
          return {
            name: item,
            value: percent
          };
        }).select(false).style({
          lineWidth: 1,
          stroke: '#fff'
        });
        chart.render();

      },
    }
  }
</script>
