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
          year: '1999',
          north: 342,
          south: 77
        }, {
          year: '2000',
          north: 348,
          south: 35
        }, {
          year: '2001',
          north: 334,
          south: -45
        }, {
          year: '2002',
          north: 325,
          south: -88
        }, {
          year: '2003',
          north: 316,
          south: -120
        }, {
          year: '2004',
          north: 318,
          south: -156
        }, {
          year: '2005',
          north: 330,
          south: -123
        }, {
          year: '2006',
          north: 355,
          south: -88
        }, {
          year: '2007',
          north: 366,
          south: -66
        }, {
          year: '2008',
          north: 337,
          south: -45
        }, {
          year: '2009',
          north: 352,
          south: -29
        }, {
          year: '2010',
          north: 377,
          south: -45
        }, {
          year: '2011',
          north: 383,
          south: -88
        }, {
          year: '2012',
          north: 344,
          south: -132
        }, {
          year: '2013',
          north: 366,
          south: -146
        }, {
          year: '2014',
          north: 389,
          south: -169
        }, {
          year: '2015',
          north: 334,
          south: -184
        }, {
          year: '2016',
          north: 322,
          south: 162
        }, {
          year: '2017',
          north: 324,
          south: 90
        }, {
          year: '2018',
          north: 329,
          south: 50
        }],
      }
    },
    mounted() {
      this.createChart(this.chartId, this.chartData);
    },
    methods: {
      createChart(container, data) {
        let DataView = DataSet.DataView;
        // 数据需要加工成 {year: '1996', type: 'north', value: 50} 的模式
        let dv = new DataView().source(data);
        dv.transform({
          type: 'fold',
          fields: ['north', 'south'], // 展开字段集
          key: 'type', // key字段
          value: 'value' // value字段
        });

        let chart = new G2.Chart({
          container: container,
          forceFit: true,
          height: this.height,
          padding: [50, 50, 80, 50],
          background: {
            fill: "#fff"
          }
        })
        chart.source(dv);
        chart.scale("year", {
          range: [0, 1]
        })
        chart.area().position('year*value').color('type');
        chart.line().position('year*value').color('type');
        chart.render();
      },
    }
  }
</script>
