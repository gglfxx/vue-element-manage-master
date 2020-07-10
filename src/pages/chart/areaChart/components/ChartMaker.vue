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
          "date": "2010-01",
          "sales": 1998
        }, {
          "date": "2010-02",
          "sales": 1800
        }, {
          "date": "2010-03",
          "sales": 1720
        }, {
          "date": "2010-04",
          "sales": 1818
        }, {
          "date": "2010-05",
          "sales": 1920
        }, {
          "date": "2010-06",
          "sales": 1802
        }, {
          "date": "2010-07",
          "sales": 1945
        }, {
          "date": "2010-08",
          "sales": 1856
        }, {
          "date": "2010-09",
          "sales": 2107
        }, {
          "date": "2010-10",
          "sales": 2140
        }, {
          "date": "2010-11",
          "sales": 2311
        }, {
          "date": "2010-12",
          "sales": 1972
        }, {
          "date": "2011-01",
          "sales": 1760
        }, {
          "date": "2011-02",
          "sales": 1824
        }, {
          "date": "2011-03",
          "sales": 1801
        }, {
          "date": "2011-04",
          "sales": 2001
        }, {
          "date": "2011-05",
          "sales": 1640
        }, {
          "date": "2011-06",
          "sales": 1502
        }, {
          "date": "2011-07",
          "sales": 1621
        }, {
          "date": "2011-08",
          "sales": 1480
        }, {
          "date": "2011-09",
          "sales": 1549
        }, {
          "date": "2011-10",
          "sales": 1390
        }, {
          "date": "2011-11",
          "sales": 1325
        }, {
          "date": "2011-12",
          "sales": 1250
        }, {
          "date": "2012-01",
          "sales": 1394
        }, {
          "date": "2012-02",
          "sales": 1406
        }, {
          "date": "2012-03",
          "sales": 1578
        }, {
          "date": "2012-04",
          "sales": 1465
        }, {
          "date": "2012-05",
          "sales": 1689
        }, {
          "date": "2012-06",
          "sales": 1755
        }, {
          "date": "2012-07",
          "sales": 1495
        }, {
          "date": "2012-08",
          "sales": 1508
        }, {
          "date": "2012-09",
          "sales": 1433
        }, {
          "date": "2012-10",
          "sales": 1344
        }, {
          "date": "2012-11",
          "sales": 1201
        }, {
          "date": "2012-12",
          "sales": 1065
        }, {
          "date": "2013-01",
          "sales": 1255
        }, {
          "date": "2013-02",
          "sales": 1429
        }, {
          "date": "2013-03",
          "sales": 1398
        }, {
          "date": "2013-04",
          "sales": 1678
        }, {
          "date": "2013-05",
          "sales": 1524
        }, {
          "date": "2013-06",
          "sales": 1688
        }, {
          "date": "2013-07",
          "sales": 1500
        }, {
          "date": "2013-08",
          "sales": 1670
        }, {
          "date": "2013-09",
          "sales": 1734
        }, {
          "date": "2013-10",
          "sales": 1699
        }, {
          "date": "2013-11",
          "sales": 1508
        }, {
          "date": "2013-12",
          "sales": 1680
        }, {
          "date": "2014-01",
          "sales": 1750
        }, {
          "date": "2014-02",
          "sales": 1602
        }, {
          "date": "2014-03",
          "sales": 1834
        }, {
          "date": "2014-04",
          "sales": 1722
        }, {
          "date": "2014-05",
          "sales": 1430
        }, {
          "date": "2014-06",
          "sales": 1280
        }, {
          "date": "2014-07",
          "sales": 1367
        }, {
          "date": "2014-08",
          "sales": 1155
        }, {
          "date": "2014-09",
          "sales": 1289
        }, {
          "date": "2014-10",
          "sales": 1104
        }, {
          "date": "2014-11",
          "sales": 1246
        }, {
          "date": "2014-12",
          "sales": 1098
        }, {
          "date": "2015-01",
          "sales": 1189
        }, {
          "date": "2015-02",
          "sales": 1276
        }, {
          "date": "2015-03",
          "sales": 1033
        }, {
          "date": "2015-04",
          "sales": 956
        }, {
          "date": "2015-05",
          "sales": 845
        }, {
          "date": "2015-06",
          "sales": 1089
        }, {
          "date": "2015-07",
          "sales": 944
        }, {
          "date": "2015-08",
          "sales": 1043
        }, {
          "date": "2015-09",
          "sales": 893
        }, {
          "date": "2015-10",
          "sales": 840
        }, {
          "date": "2015-11",
          "sales": 934
        }, {
          "date": "2015-12",
          "sales": 810
        }, {
          "date": "2016-01",
          "sales": 782
        }, {
          "date": "2016-02",
          "sales": 1089
        }, {
          "date": "2016-03",
          "sales": 745
        }, {
          "date": "2016-04",
          "sales": 680
        }, {
          "date": "2016-05",
          "sales": 802
        }, {
          "date": "2016-06",
          "sales": 697
        }, {
          "date": "2016-07",
          "sales": 583
        }, {
          "date": "2016-08",
          "sales": 456
        }, {
          "date": "2016-09",
          "sales": 524
        }, {
          "date": "2016-10",
          "sales": 398
        }, {
          "date": "2016-11",
          "sales": 278
        }, {
          "date": "2016-12",
          "sales": 195
        }, {
          "date": "2017-01",
          "sales": 145
        }, {
          "date": "2017-02",
          "sales": 207
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
          padding: [50],
          background: {
            fill: "#fff"
          }
        })
        chart.source(data);
        chart.scale('date', {
          range: [0, 1],
          tickCount: 10,
          type: 'timeCat'
        });
        chart.axis('date', {
          label: {
            textStyle: {
              fill: '#aaa'
            }
          }
        });
        chart.axis('sales', {
          label: {
            textStyle: {
              fill: '#aaa'
            },
            formatter(text) {
              return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
            }
          }
        });
        chart.guide().dataMarker({
          top: true,
          content: '因政策调整导致销量下滑',
          position: ['2014-01', 1750],
          style: {
            text: {
              fontSize: 13
            }
          },
          lineLength: 30
        });
        chart.line().position('date*sales');
        chart.area().position('date*sales');
        chart.render();
      },
    }
  }
</script>
