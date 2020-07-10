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
          type: '日用品',
          money: 300
        }, {
          type: '伙食费',
          money: 900
        }, {
          type: '交通费',
          money: 200
        }, {
          type: '水电费',
          money: 300
        }, {
          type: '房租',
          money: 1200
        }, {
          type: '商场消费',
          money: 1000
        }, {
          type: '应酬交际',
          money: 2000
        }, {
          type: '总费用',
          money: 5900
        }]
      }
    },
    mounted() {
      this.createChart(this.chartId, this.chartData);
    },
    methods: {
      createChart(container, data) {
        let _G = G2,
          Util = _G.Util,
          Shape = _G.Shape,
          Global = _G.Global;

        function getRectPath(points) {
          let path = [];
          for (let i = 0; i < points.length; i++) {
            let point = points[i];
            if (point) {
              let action = i === 0 ? 'M' : 'L';
              path.push([action, point.x, point.y]);
            }
          }
          let first = points[0];
          path.push(['L', first.x, first.y]);
          path.push(['z']);
          return path;
        }

        function getFillAttrs(cfg) {
          let defaultAttrs = Global.shape.interval;
          let attrs = Util.mix({}, defaultAttrs, cfg.style, {
            fill: cfg.color,
            stroke: cfg.color,
            fillOpacity: cfg.opacity
          });
          return attrs;
        }

        // 自定义shape
        Shape.registerShape('interval', 'waterfall', {
          draw(cfg, container) {
            let attrs = getFillAttrs(cfg);
            let rectPath = getRectPath(cfg.points);
            rectPath = this.parsePath(rectPath);
            let interval = container.addShape('path', {
              attrs: Util.mix(attrs, {
                path: rectPath
              })
            });

            if (cfg.nextPoints) {
              let linkPath = [
                ['M', cfg.points[2].x, cfg.points[2].y],
                ['L', cfg.nextPoints[0].x, cfg.nextPoints[0].y]
              ];

              if (cfg.nextPoints[0].y === 0) {
                linkPath[1] = ['L', cfg.nextPoints[1].x, cfg.nextPoints[1].y];
              }
              linkPath = this.parsePath(linkPath);
              container.addShape('path', {
                attrs: {
                  path: linkPath,
                  stroke: '#8c8c8c',
                  lineDash: [4, 2]
                }
              });
            }
            return interval;
          }
        });

        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          if (i > 0 && i < data.length - 1) {
            if (Util.isArray(data[i - 1].money)) {
              item.money = [data[i - 1].money[1], item.money + data[i - 1].money[1]];
            } else {
              item.money = [data[i - 1].money, item.money + data[i - 1].money];
            }
          }
        }

        let chart = new G2.Chart({
          container,
          forceFit: true,
          height: this.height,
          padding: [50, 50, 80, 80],
          background: {
            fill: "#fff"
          }
        });
        chart.source(data);
        // 自定义图例
        chart.legend({
          custom: true,
          clickable: false,
          items: [{
            value: '各项花销',
            marker: {
              symbol: 'circle',
              fill: '#1890FF',
              radius: 5
            }
          }, {
            value: '总费用',
            marker: {
              symbol: 'circle',
              fill: '#8c8c8c',
              radius: 5
            }
          }]
        });
        chart.interval().position('type*money').color('type', function(type) {
          if (type === '总费用') {
            return '#8c8c8c';
          }
          return '#1890FF';
        }).tooltip('type*money', (type, money) => {
          if (Util.isArray(money)) {
            return {
              name: '费用(元)',
              value: money[1] - money[0]
            };
          } else {
            return {
              name: '费用(元)',
              value: money
            };
          }


        }).shape('waterfall');
        chart.render();
      },
    }
  }
</script>
