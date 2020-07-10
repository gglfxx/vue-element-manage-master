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
          type: '分类一',
          value: 27
        }, {
          type: '分类二',
          value: 25
        }, {
          type: '分类三',
          value: 18
        }, {
          type: '分类四',
          value: 15
        }, {
          type: '分类五',
          value: 10
        }, {
          type: 'Other',
          value: 5
        }],
      }
    },
    mounted() {
      this.createChart(this.chartId, this.chartData);
    },
    methods: {
      createChart(container, data) {
        let max = 0;
        data.forEach(obj => {
          if (obj.value > max) {
            max = obj.value;
          }
        });
        // 自定义 other 的图形，增加两条线
        G2.Shape.registerShape('interval', 'sliceShape', {
          draw(cfg, container) {
            let points = cfg.points;
            let origin = cfg.origin._origin;
            let percent = origin.value / max;
            let xWidth = points[2].x - points[1].x;
            let width = xWidth * percent;
            let path = [];
            path.push(['M', points[0].x, points[0].y]);
            path.push(['L', points[1].x, points[1].y]);
            path.push(['L', points[0].x + width, points[2].y]);
            path.push(['L', points[0].x + width, points[3].y]);
            path.push('Z');
            path = this.parsePath(path);
            return container.addShape('path', {
              attrs: {
                fill: cfg.color,
                path: path
              }
            });
          }
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
        chart.source(data);
        chart.coord('theta');
        chart.intervalStack().position('value').color('type').shape('sliceShape').label('type', {
          offset: -30,
          textStyle: {
            fill: "#404040",
          }
        });
        chart.render();

      },
    }
  }
</script>
