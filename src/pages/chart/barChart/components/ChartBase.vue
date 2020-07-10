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
          type: '汽车',
          value: 34
        }, {
          type: '建材家居',
          value: 85
        }, {
          type: '住宿旅游',
          value: 103
        }, {
          type: '交通运输与仓储邮政',
          value: 142
        }, {
          type: '教育',
          value: 367
        }, {
          type: '建筑房地产',
          value: 251
        }, {
          type: 'IT 通讯电子',
          value: 491
        }, {
          type: '社会公共管理',
          value: 672
        }, {
          type: '医疗卫生',
          value: 868
        }, {
          type: '金融保险',
          value: 1232
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
        let ds = new DataSet();
        let dv = ds.createView().source(data);
        dv.transform({
          type: 'sort',
          callback(a, b) { // 排序依据，和原生js的排序callback一致
            return a.value - b.value;
          }
        });

        chart.source(dv, {
          value: {
            alias: '销量（百万）'
          }
        });
        chart.axis('type', {
          tickLine: {
            length: 0
          },
          line: {
            lineWidth: 0
          }
        });
        chart.coord().transpose();
        chart
          .interval()
          .position('type*value')
          .size(20)
          .label('value', {
            textStyle: {
              fill: '#8d8d8d'
            },
            offset: 10
          });
        chart.render();

      },
    }
  }
</script>
