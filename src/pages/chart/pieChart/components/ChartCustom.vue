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
          sex: '男',
          sold: 0.45
        }, {
          sex: '女',
          sold: 0.55
        }],
      }
    },
    mounted() {
      this.createChart(this.chartId, this.chartData);
    },
    methods: {
      createChart(container, data) {
        const Shape = G2.Shape;
        // 自定义shape
        Shape.registerShape('interval', 'radiusPie', {
          // 绘制饼状图
          draw: function draw(cfg, container) {
            // 将归一化后的数据转换为画布上的坐标
            let points = cfg.origin.points;
            let path = [];
            for (let i = 0; i < cfg.origin.points.length; i += 4) {
              path.push(['M', points[i].x, points[i].y]);
              path.push(['L', points[i + 1].x, points[i + 1].y]);
              path.push(['L', points[i + 2].x, points[i + 2].y]);
              path.push(['L', points[i + 3].x, points[i + 3].y]);
              path.push(['L', points[i].x, points[i].y]);
              path.push(['z']);
            }
            path = this.parsePath(path, true);
            let rect = container.addShape('path', {
              attrs: {
                fill: cfg.color || '#00D9DF',
                path: path
              }
            });
            let minH = Math.min(path[1][7], path[2][2]);
            let minW = Math.min(path[1][6], path[2][1]);
            let diffH = Math.abs(path[1][7] - path[2][2]);
            let diffW = Math.abs(path[1][6] - path[2][1]);
            container.addShape('circle', {
              attrs: {
                x: minW + diffW / 2,
                y: minH + diffH / 2,
                fill: cfg.color,
                radius: diffH / 2
              }
            });
            let minHH = Math.min(path[3][7], path[4][2]);
            let minWW = Math.min(path[3][6], path[4][1]);
            let diffHH = Math.abs(path[3][7] - path[4][2]);
            let diffWW = Math.abs(path[3][6] - path[4][1]);
            container.addShape('circle', {
              attrs: {
                x: minWW + diffWW / 2,
                y: minHH + diffHH / 2,
                fill: cfg.color,
                radius: diffH / 2
              }
            });
            return rect;
          }
        });

        let chart = new G2.Chart({
          container: container,
          forceFit: true,
          height: this.height,
          padding: [50, 0, 80, 0],
          background: {
            fill: "#fff"
          }
        })
        const COLORS = ['#1890ff', '#f04864'];
        chart.coord('theta', {
          radius: 0.95
        });
        chart.source(data);
        chart.tooltip({
          showTitle: false
        });
        chart.intervalStack().position('sold').shape('radiusPie').color('sex', COLORS).label('sold', {
          useHtml: true,
          htmlTemplate(text, item) {
            let isFemale = item.point.sex === '女';
            let src = isFemale ?
              'https://gw.alipayobjects.com/zos/rmsportal/mweUsJpBWucJRixSfWVP.png' :
              'https://gw.alipayobjects.com/zos/rmsportal/oeCxrAewtedMBYOETCln.png';
            let color = isFemale ? COLORS[1] : COLORS[0];
            let IMG = '<img style="width:30px" src="' + src + '" /><br/>';
            return `<div style="text-align:center;color:${color}">${IMG}${(text * 100).toFixed(0)}%</div>`
          }
        });
        chart.render();
      },
    }
  }
</script>
