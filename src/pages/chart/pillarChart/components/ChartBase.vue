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
          type: "类型1",
          value: 45
        }, {
          type: "类型2",
          value: 52
        }, {
          type: "类型3",
          value: 89
        }, {
          type: "类型4",
          value: 145
        }, {
          type: "类型5",
          value: 29
        }, {
          type: "类型6",
          value: 102
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
          padding: [50, 50, 50, 80],
          background: { fill: "#fff" }
        })
        chart.source(data);
        chart.scale("value", {
          min: 0,
          alias: "数量",
        });
        chart.axis("type", {
          tickLine: {
            length: 0
          }
        });
        chart.axis("value", {
          line: {
            lineWidth: 1,
            stroke: 'rgb(202,202,202)',
          },
          title: {
            textStyle: {
              fill: "#4a4a4a"
            }
          }
        });
        chart
          .interval()
          .position('type*value')
          .color("value")
          .label("value");
        chart.render();
      },
    }
  }
</script>
