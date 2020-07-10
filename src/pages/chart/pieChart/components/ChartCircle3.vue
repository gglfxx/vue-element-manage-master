<template>
    <div :id="chartId"></div>
</template>

<script>
    import G2 from "@antv/g2";
    import {
        DataSet
    } from '@antv/data-set';
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
                    type: '评估中',
                    percent: 0.23
                }, {
                    type: '设计中',
                    percent: 0.28
                }, {
                    type: '正在开发',
                    percent: 0.30
                }, {
                    type: '已上线',
                    percent: 0.19
                }],
            }
        },
        mounted() {
            this.createChart(this.chartId, this.chartData);
        },
        methods: {
            createChart(container, data) {
                let sum = 500;
                let ds = new DataSet();
                let dv = ds.createView().source(data);
                dv.transform({
                    type: 'map',
                    callback: function callback(row) {
                        row.value = parseInt(sum * row.percent);
                        return row;
                    }
                });

                let chart = new G2.Chart({
                    container: container,
                    forceFit: true,
                    height: this.height,
                    padding: [50, 0],
                    background: {
                        fill: "#fff"
                    }
                })
                chart.source(dv);
                chart.tooltip(false);
                chart.legend({
                    position: 'right-center',
                    offsetX: -100
                });
                chart.coord('theta', {
                    radius: 0.8,
                    innerRadius: 0.6
                });
                chart.intervalStack().position('percent').color('type', ['#0a7aca', '#0a9afe', '#4cb9ff', '#8ed1ff']).label(
                    'percent', {
                        offset: -18,
                        textStyle: {
                            fill: 'white',
                            fontSize: 12,
                            shadowBlur: 2,
                            shadowColor: 'rgba(0, 0, 0, .45)'
                        },
                        rotate: 0,
                        autoRotate: false,
                        formatter: function formatter(text, item) {
                            return String(parseInt(item.point.percent * 100)) + '%';
                        }
                    });
                chart.guide().html({
                    position: ['50%', '50%'],
                    html: '<div class="g2-guide-html"><p class="title">项目总计</p><p class="value">500</p></div>'
                });
                chart.on('interval:mouseenter', function (ev) {
                    let data = ev.data._origin;
                    document.querySelector(".g2-guide-html .title").innerText = data.type;
                    document.querySelector(".g2-guide-html .value").innerText = data.value;
                });
                chart.on('interval:mouseleave', function () {
                    document.querySelector(".g2-guide-html .title").innerText = "项目总计";
                    document.querySelector(".g2-guide-html .value").innerText = 500;
                });
                chart.render();
            },
        }
    }
</script>
<style>
    .g2-guide-html {
        width: 100px;
        height: 80px;
        vertical-align: middle;
        text-align: center;
    }

    .g2-guide-html .title {
        font-size: 12px;
        color: #8c8c8c !important;
        font-weight: 300;
    }

    .g2-guide-html .value {
        font-size: 32px;
        color: #000 !important;
        font-weight: bold;
    }
</style>