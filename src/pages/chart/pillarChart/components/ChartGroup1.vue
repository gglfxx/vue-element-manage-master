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
          type: '书架',
          value: 48000,
          cat: '家具'
        }, {
          type: '椅子',
          value: 36000,
          cat: '家具'
        }, {
          type: '桌子',
          value: 9000,
          cat: '家具'
        }, {
          type: '复印机',
          value: 30500,
          cat: '技术'
        }, {
          type: '电话',
          value: 22000,
          cat: '技术'
        }, {
          type: '配件',
          value: 12000,
          cat: '技术'
        }, {
          type: '纸张',
          value: 25000,
          cat: '办公用品'
        }, {
          type: '笔',
          value: 17000,
          cat: '办公用品'
        }, {
          type: '美术',
          value: 8000,
          cat: '办公用品'
        }, {
          type: '收纳',
          value: 9000,
          cat: '办公用品'
        }]

      }
    },
    mounted() {
      this.createChart(this.chartId, this.chartData);
    },
    methods: {
      createChart(container, data) {
        let chart = new G2.Chart({
          container,
          forceFit: true,
          height: this.height,
          padding: "auto",
          background: {
            fill: "#fff"
          }
        });
        chart.source(data);
        chart.scale("value", {
          alias: '数量'
        });
        chart.axis("type", {
          label: {
            textStyle: {
              fill: '#aaa'
            }
          },
          tickLine: {
            length: 0
          }
        });
        chart.axis("value", {
          label: {
            textStyle: {
              fill: '#aaa'
            },
            formatter(text) {
              return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
            }
          },
          title: {
            offset: 70,
            textStyle: {
              fill: '#aaa'
            }
          }
        });
        chart.tooltip(true, {
          showTitle: false,
          itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{type}：{value}</li>'
        });
        chart.guide().text({
          top: true,
          position: ['椅子', 'min'],
          content: '家具',
          style: {
            fill: '#000',
            fontSize: 14,
            fontWeight: '300',
            textAlign: 'center'
          },
          offsetY: 40
        });
        chart.guide().text({
          top: true,
          position: ['电话', 'min'],
          content: '技术',
          style: {
            fill: '#000',
            fontSize: 14,
            fontWeight: '300',
            textAlign: 'center'
          },
          offsetY: 40
        });
        chart.guide().text({
          top: true,
          position: ['笔', 'min'],
          content: '办公用品',
          style: {
            fill: '#000',
            fontSize: 14,
            fontWeight: '300'
          },
          offsetY: 40,
          offsetX: 20
        });
        chart.guide().line({
          start: ['30%', '100%'],
          end: ['30%', '120%'],
          lineStyle: {
            stroke: '#d9d9d9',
            lineDash: [0, 0]
          }
        });
        chart.guide().line({
          start: ['60%', '100%'],
          end: ['60%', '120%'],
          lineStyle: {
            stroke: '#d9d9d9',
            lineDash: [0, 0]
          }
        });
        chart.interval().position('type*value').color('cat').tooltip('type*value', (type, value) => {
          return {
            type: type,
            value: value
          };
        });

        chart.render();
      },
    }
  }
</script>
