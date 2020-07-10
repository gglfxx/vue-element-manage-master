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
                    sex: '男',
                    sold: 0.45
                }, {
                    sex: '女',
                    sold: 0.55
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
                    padding: [50, 0, 80, 0],
                    background: {
                        fill: "#fff"
                    }
                })
                chart.source(data);
                chart.scale("sold", {
                    alias: "百分比",
                    formatter(val) {
                        return parseInt(val * 100) + '%';
                    }
                });
                chart.coord('theta', {
                    radius: 0.8,
                });
                chart.tooltip({
                    showTitle: false
                });
                chart.intervalStack().position('sold').label('sex').style('sex', {
                    fill(sex) {
                        if (sex === '男') {
                            return 'p(a)https://gw.alipayobjects.com/zos/rmsportal/nASTPWDPJDMgkDRlAUmw.jpeg';
                        } else {
                            return 'p(a)https://gw.alipayobjects.com/zos/rmsportal/ziMWHpHSTlTzURSzCarw.jpeg';
                        }

                    }
                });
                chart.render();
            },
        }
    }
</script>