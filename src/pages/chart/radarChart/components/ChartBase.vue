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
        chartData: [
          { item: 'Design', a: 70, b: 30 },
          { item: 'Development', a: 60, b: 70 },
          { item: 'Marketing', a: 50, b: 60 },
          { item: 'Users', a: 40, b: 50 },
          { item: 'Test', a: 60, b: 70 },
          { item: 'Language', a: 70, b: 50 },
          { item: 'Technology', a: 50, b: 40 },
          { item: 'Support', a: 30, b: 40 },
          { item: 'Sales', a: 60, b: 40 },
          { item: 'UX', a: 50, b: 60 }
        ]
      }
    },
    mounted() {
      this.createChart(this.chartId, this.chartData);
    },
    methods: {
      createChart(container, data) {
        const { DataView } = DataSet;
        const dv = new DataView().source(data);
        dv.transform({
          type: 'fold',
          // 展开字段集
          fields: ['a', 'b'],
          // key字段
          key: 'user',
          // value字段
          value: 'score'
        });
        const chart = new G2.Chart({
          container,
          forceFit: true,
          height: this.height,
          padding: [20, 20, 95, 20]
        });
        chart.source(dv, {
          score: { min: 0, max: 80 }
        });
        chart.coord('polar', {
          radius: 0.8
        });
        chart.axis('item', {
          line: null,
          tickLine: null,
          grid: {
            lineStyle: {
              lineDash: null
            },
            hideFirstLine: false
          }
        });
        chart.axis('score', {
          line: null,
          tickLine: null,
          grid: {
            type: 'polygon',
            lineStyle: {
              lineDash: null
            },
            alternateColor: 'rgba(0, 0, 0, 0.04)'
          }
        });
        chart.legend('user', {
          marker: 'circle',
          offset: 30
        });
        chart.line().position('item*score').color('user').size(2);
        chart.point().position('item*score').color('user').shape('circle').size(4).style({
          stroke: '#fff',
          lineWidth: 1,
          fillOpacity: 1
        });
        // 添加填充色
        chart.area().position('item*score').color('user');
        chart.render();
      }
    }
  }
</script>
