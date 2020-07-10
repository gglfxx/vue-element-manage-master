<template>
  <div :id="chartId"></div>
</template>

<script>
  import G2 from '@antv/g2';

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
          city: '石家庄',
          type: '水果',
          value: 14500
        }, {
          city: '石家庄',
          type: '米面',
          value: 8500
        }, {
          city: '石家庄',
          type: '特产零食',
          value: 10000
        }, {
          city: '石家庄',
          type: '茶叶',
          value: 7000
        }, {
          city: '深圳',
          type: '水果',
          value: 9000
        }, {
          city: '深圳',
          type: '米面',
          value: 8500
        }, {
          city: '深圳',
          type: '特产零食',
          value: 11000
        }, {
          city: '深圳',
          type: '茶叶',
          value: 6000
        }, {
          city: '温州',
          type: '水果',
          value: 16000
        }, {
          city: '温州',
          type: '米面',
          value: 5000
        }, {
          city: '温州',
          type: '特产零食',
          value: 6000
        }, {
          city: '温州',
          type: '茶叶',
          value: 10000
        }, {
          city: '宁波',
          type: '水果',
          value: 14000
        }, {
          city: '宁波',
          type: '米面',
          value: 9000
        }, {
          city: '宁波',
          type: '特产零食',
          value: 10000
        }, {
          city: '宁波',
          type: '茶叶',
          value: 9000
        }, {
          city: '无锡',
          type: '水果',
          value: 14000
        }, {
          city: '无锡',
          type: '米面',
          value: 9000
        }, {
          city: '无锡',
          type: '特产零食',
          value: 10000
        }, {
          city: '无锡',
          type: '茶叶',
          value: 6000
        }, {
          city: '杭州',
          type: '水果',
          value: 9000
        }, {
          city: '杭州',
          type: '米面',
          value: 8500
        }, {
          city: '杭州',
          type: '特产零食',
          value: 10000
        }, {
          city: '杭州',
          type: '茶叶',
          value: 6000
        }, {
          city: '北京',
          type: '水果',
          value: 17000
        }, {
          city: '北京',
          type: '米面',
          value: 6000
        }, {
          city: '北京',
          type: '特产零食',
          value: 7000
        }, {
          city: '北京',
          type: '茶叶',
          value: 10000
        }, {
          city: '上海',
          type: '水果',
          value: 18000
        }, {
          city: '上海',
          type: '米面',
          value: 11000
        }, {
          city: '上海',
          type: '特产零食',
          value: 15000
        }, {
          city: '上海',
          type: '茶叶',
          value: 14000
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
          padding: [20, 100, 50, 80],
          background: {
            fill: "#fff"
          }
        })
        chart.source(data, {
          value: {
            alias: '销售额（万）'
          }
        });
        chart.axis('city', {
          label: {
            textStyle: {
              fill: '#aaa',
              fontSize: 12
            }
          },
          tickLine: {
            length: 0
          }
        });
        chart.axis('value', {
          label: {
            textStyle: {
              fill: '#aaa',
              fontSize: 12
            }
          },
          title: {
            offset: 30,
            textStyle: {
              fontSize: 14,
              fontWeight: 300
            }
          }
        });
        chart.legend({
          position: 'right-bottom'
        });
        chart.coord().transpose();
        chart.interval().position('city*value').color('type').adjust([{
          type: 'dodge',
          marginRatio: 0.3
        }]);
        chart.render();

      },
    }
  }
</script>
