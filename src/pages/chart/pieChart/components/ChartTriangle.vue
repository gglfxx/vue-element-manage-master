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
                    type: '分类一',
                    value: 20
                }, {
                    type: '分类二',
                    value: 18
                }, {
                    type: '分类三',
                    value: 32
                }, {
                    type: '分类四',
                    value: 15
                }, {
                    type: 'Other',
                    value: 15
                }],
            }
        },
        mounted() {
            this.createChart(this.chartId, this.chartData);
        },
        methods: {
            createChart(container, data) {
                // 根据比例，获取两点之间的点
                function getPoint(p0, p1, ratio) {
                    return {
                        x: (1 - ratio) * p0.x + ratio * p1.x,
                        y: (1 - ratio) * p0.y + ratio * p1.y
                    };
                }
                var pointRatio = 0.7; // 设置开始变成三角形的位置 0.7
                // 自定义 other 的图形，增加两条线
                G2.Shape.registerShape('interval', 'triangleShape', {
                    draw(cfg, container) {
                        var centerPoint = {
                            x: cfg.points[3].x,
                            y: (cfg.points[2].y + cfg.points[3].y) / 2
                        };
                        centerPoint = this.parsePoint(centerPoint);
                        var points = this.parsePoints(cfg.points);
                        var tmpPoint1 = getPoint(points[0], points[3], pointRatio);
                        var tmpPoint2 = getPoint(points[1], points[2], pointRatio);
                        var path = [];
                        path.push(['M', points[0].x, points[0].y]);
                        path.push(['L', points[1].x, points[1].y]);
                        path.push(['L', tmpPoint2.x, tmpPoint2.y]);
                        path.push(['L', centerPoint.x, centerPoint.y]);
                        path.push(['L', tmpPoint1.x, tmpPoint1.y]);
                        path.push('Z');
                        return container.addShape('path', {
                            attrs: {
                                fill: cfg.color,
                                path: path,
                                lineWidth: 1,
                                stroke: 'white'
                            }
                        });
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
                });
                chart.source(data);
                chart.coord('theta', {
                    radius: 0.9
                });
                chart.tooltip({
                    showTitle: false
                })
                chart.intervalStack().position('value').color('type').shape('triangleShape').label('type');
                chart.render();

            },
        }
    }
</script>