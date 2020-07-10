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
        chartId: 'chart' + +new Date() + ((Math.random() * 1000).toFixed(0) + ''),
        chartData: [{
          type: '硕士',
          value: 0.32
        }, {
          type: '本科',
          value: 0.31
        }, {
          type: '博士',
          value: 0.02
        }, {
          type: '初中',
          value: 0.09
        }, {
          type: '专科',
          value: 0.19
        }, {
          type: '未知',
          value: 0.08
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
            fill: "#fff"
          }
        })
        chart.source(data);
        chart.coord('theta');
        chart.tooltip({
          showTitle: false
        })
        chart
          .intervalStack()
          .position('value')
          .color('type', ['#2593fc', '#38c060', '#27c1c1', '#705dc8', '#3b4771', '#f9cb34'])
          .label('value', val => {
            const offset = val > 0.02 ? -30 : 30;
            const labelClass = val > 0.02 ? "g2-label-item-inner" : "g2-label-item-outer";
            return {
              offset: offset,
              useHtml: true,
              htmlTemplate: (text, item) => {
                const d = item.point;
                const percent = parseInt(String(Number(text) * 100),10) + '%';
                return '<div class=' + labelClass + '>' + d.type + percent + '</div>';
              }
            };
          });
        chart.render();
      },
    }
  }
</script>
<style scope>
  .g2-label-item-inner {
    text-align: center;
    font-size: 12px;
    color: #fff !important;
  }

  .g2-label-item-outer {
    width: 60px;
    font-size: 12px;
    color: #595959 !important;
  }
</style>
