<template>
  <div :id="chartId"></div>
</template>

<script>
  import G2 from '@antv/g2';
  import { DataSet } from '@antv/data-set';

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
          city: '中国（北京）',
          type: '首都人口',
          value: 0.01
        }, {
          city: '中国（北京）',
          type: '城市人口',
          value: 0.53
        }, {
          city: '中国（北京）',
          type: '农村人口',
          value: 0.46
        }, {
          city: '美国（华盛顿）',
          type: '首都人口',
          value: 0.01
        }, {
          city: '美国（华盛顿）',
          type: '城市人口',
          value: 0.8
        }, {
          city: '美国（华盛顿）',
          type: '农村人口',
          value: 0.19
        }, {
          city: '印度（德里）',
          type: '首都人口',
          value: 0.02
        }, {
          city: '印度（德里）',
          type: '城市人口',
          value: 0.3
        }, {
          city: '印度（德里）',
          type: '农村人口',
          value: 0.68
        }, {
          city: '俄罗斯（莫斯科）',
          type: '首都人口',
          value: 0.08
        }, {
          city: '俄罗斯（莫斯科）',
          type: '城市人口',
          value: 0.66
        }, {
          city: '俄罗斯（莫斯科）',
          type: '农村人口',
          value: 0.26
        }, {
          city: '法国（巴黎）',
          type: '首都人口',
          value: 0.16
        }, {
          city: '法国（巴黎）',
          type: '城市人口',
          value: 0.63
        }, {
          city: '法国（巴黎）',
          type: '农村人口',
          value: 0.21
        }, {
          city: '韩国（首尔）',
          type: '首都人口',
          value: 0.19
        }, {
          city: '韩国（首尔）',
          type: '城市人口',
          value: 0.63
        }, {
          city: '韩国（首尔）',
          type: '农村人口',
          value: 0.18
        }, {
          city: '丹麦（哥本哈根）',
          type: '首都人口',
          value: 0.22
        }, {
          city: '丹麦（哥本哈根）',
          type: '城市人口',
          value: 0.65
        }, {
          city: '丹麦（哥本哈根）',
          type: '农村人口',
          value: 0.13
        }, {
          city: '冰岛（雷克雅未克）',
          type: '首都人口',
          value: 0.56
        }, {
          city: '冰岛（雷克雅未克）',
          type: '城市人口',
          value: 0.38
        }, {
          city: '冰岛（雷克雅未克）',
          type: '农村人口',
          value: 0.06
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
          padding: [50, 50, 50, 130],
          background: {
            fill: "#fff"
          }
        })
        chart.source(data, {
          value: {
            alias: '占比'
          }
        });
        chart.axis('city', {
          label: {
            textStyle: {
              fill: '#595959',
              fontSize: 12
            }
          },
          tickLine: {
            length: 0
          },
          line: {
            lineWidth: 0
          }
        });
        chart.axis('value', {
          title: {
            offset: 30,
            textStyle: {
              fontSize: 14,
              fontWeight: 300
            }
          },
          grid: {
            lineStyle: {
              lineWidth: 0
            }
          }
        });
        chart.legend({
          position: 'top-center'
        });
        chart.coord().transpose();
        chart.intervalStack().position('city*value').color('type*city', function(type, city) {
          var color = "";
          if (type === '首都人口') color = '#1890ff';
          if (type === '城市人口') color = '#ced4d9';
          if (type === '农村人口') color = '#f0f2f3';
          return color;
        }).size(26).label('value*type', function(val, t) {
          var color = t === "首都人口" ? 'white' : '#47494b';
          if (val < 0.05) {
            return false;
          } else {
            return {
              position: 'middle',
              offset: 0,
              textStyle: {
                fontSize: 12,
                fill: color,
                shadowBlur: 2,
                shadowColor: 'rgba(0, 0, 0, .45)'
              }
            };
          }
        });
        chart.render();

      },
    }
  }
</script>
