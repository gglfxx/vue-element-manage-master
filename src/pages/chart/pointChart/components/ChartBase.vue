<template>
  <div :id="chartId"></div>
</template>

<script>
  import G2 from '@antv/g2';
  import { DataSet } from '@antv/data-set';
  import data from './pointData.js';

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
        chartData: data,
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
          padding: [50, 50, 80, 80],
          background: {
            fill: "#fff"
          }
        })
        chart.source(data);
        chart.scale({
          height: {
            alias: '身高(cm)'
          },
          weight: {
            alias: '体重(kg)'
          },
        })
        chart.axis("weight", {
          title: {
            textStyle: {
              fontSize: 13,
              fill: "#bbb",
            }
          }
        })
        chart.axis("height", {
          title: {
            textStyle: {
              fontSize: 13,
              fill: "#bbb",
            }
          }
        })
        chart.tooltip({
          showTitle: false,
          crosshairs: {
            type: 'cross'
          },
          itemTpl: '<li data-index={index} style="margin-bottom:4px;">' +
            '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
            '{name}<br/>' + '{value}' + '</li>'
        });
        chart.point().position('height*weight').color("gender", ["#ef476f", "#06aed5"]).size(4).shape('circle')
          .opacity(0.65).tooltip(
            'gender*height*weight',
            function(gender, height, weight) {
              return {
                name: gender,
                value: height + 'cm, ' + weight + 'kg'
              };
            });
        chart.render();
      },
    }
  }
</script>
