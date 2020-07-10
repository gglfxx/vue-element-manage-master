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
          item: '事例一',
          percent: 0.4
        }, {
          item: '事例二',
          percent: 0.21
        }, {
          item: '事例三',
          percent: 0.17
        }, {
          item: '事例四',
          percent: 0.13
        }, {
          item: '事例五',
          percent: 0.09
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
          padding: [50, 0],
          background: {
            fill: '#fff'
          }
        })
        chart.source(data);
        chart.scale('percent', {
          formatter: (val) => val * 100 + '%'
        });
        chart.coord('theta', {
          startAngle: Math.PI, // 起始角度
          endAngle: Math.PI * (3 / 2) // 结束角度
        });

        chart.tooltip({
          showTitle: false,
          itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
        });
        chart
          .intervalStack()
          .position('percent')
          .color('item')
          .label('percent', {
            formatter: (val, item) => item.point.item + ': ' + val
          })
          .tooltip('item*percent', (item, percent) => {
            percent = percent * 100 + '%';
            return {
              name: item,
              value: percent
            };
          });
        chart.render();
      },
    }
  }
</script>
