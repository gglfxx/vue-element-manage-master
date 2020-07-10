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
          "name": "张三",
          "vote": 35654
        }, {
          "name": "李四",
          "vote": 65456
        }, {
          "name": "王五",
          "vote": 45724
        }, {
          "name": "赵六",
          "vote": 13654
        }],
      }
    },
    mounted() {
      this.createChart(this.chartId, this.chartData);
    },
    methods: {
      createChart(container, data) {
        const imageMap = {
          "张三": "https://zos.alipayobjects.com/rmsportal/mYhpaYHyHhjYcQf.png",
          "李四": "https://zos.alipayobjects.com/rmsportal/JBxkqlzhrlkGlLW.png",
          "王五": "https://zos.alipayobjects.com/rmsportal/zlkGnEMgOawcyeX.png",
          "赵六": "https://zos.alipayobjects.com/rmsportal/KzCdIdkwsXdtWkg.png"
        };
        let chart = new G2.Chart({
          container,
          forceFit: true,
          height: this.height,
          padding: [60, 20, 40, 60],
          background: {
            fill: "#fff"
          }
        });
        chart.source(data);
        chart.scale({
          name: {
            alias: '姓名',
          },
          vote: {
            min: 0,
            alias: '票数',
            formatter: (val) => (Number(val) / 1000) + 'k'
          }
        });
        chart
          .tooltip({
            showTitle: false
          });

        chart
          .interval()
          .position('name*vote')
          .color('name', ['#7f8da9', '#fec514', '#db4c3c', '#daf0fd'])
          .tooltip('name*vote');

        chart
          .point()
          .position('name*vote')
          .size(60)
          .shape('name', (name) => ['image', imageMap[name]]);

        chart.render();
      },
    }
  }
</script>
