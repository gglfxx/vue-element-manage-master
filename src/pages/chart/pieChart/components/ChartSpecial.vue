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
                    type: '微博',
                    value: 93.33
                }, {
                    type: '其他',
                    value: 6.67
                }],
                otherData: [{
                    type: '论坛',
                    value: 1.77
                }, {
                    type: '网站',
                    value: 1.44
                }, {
                    type: '微信',
                    value: 1.12
                }, {
                    type: '客户端',
                    value: 1.05
                }, {
                    type: '新闻',
                    value: 0.81
                }, {
                    type: '视频',
                    value: 0.39
                }, {
                    type: '博客',
                    value: 0.37
                }, {
                    type: '报刊',
                    value: 0.17
                }],
            }
        },
        mounted() {
            this.createChart(this.chartId, this.chartData, this.otherData);
        },
        methods: {
            createChart(container, data, otherData) {
                /*---------绘制连接区间-----------*/
                function drawLinkArea() {
                    let canvas = chart.get('canvas');
                    let container = chart.get('backPlot');
                    let view1_coord = view1.get('coord');
                    let center = view1_coord.center;
                    let radius = view1_coord.radius;
                    let interval_geom = chart.getAllGeoms()[1];
                    let interval_container = interval_geom.get('shapeContainer');
                    let interval_bbox = interval_container.getBBox();
                    let view2_coord = view2.get('coord');
                    //area points
                    let pie_start1 = {
                        x: center.x + Math.cos(Math.PI * 2 - otherOffsetAngle) * radius,
                        y: center.y + Math.sin(Math.PI * 2 - otherOffsetAngle) * radius
                    };
                    let pie_start2 = {
                        x: center.x + Math.cos(otherOffsetAngle) * radius,
                        y: center.y + Math.sin(otherOffsetAngle) * radius
                    };
                    let interval_end1 = {
                        x: interval_bbox.minX,
                        y: view2_coord.end.y
                    };
                    let interval_end2 = {
                        x: interval_bbox.minX,
                        y: view2_coord.start.y
                    };
                    let path = [
                        ['M', pie_start1.x, pie_start1.y],
                        ['L', pie_start2.x, pie_start2.y],
                        ['L', interval_end2.x, interval_end2.y],
                        ['L', interval_end1.x, interval_end1.y],
                        ['Z']
                    ];
                    container.addShape('path', {
                        attrs: {
                            path: path,
                            fill: '#e9f4fe'
                        }
                    });
                    canvas.draw();
                }

                let otherRatio = 6.67 / 100; // Other 的占比
                let otherOffsetAngle = otherRatio * Math.PI; // other 占的角度的一半

                let chart = new G2.Chart({
                    container: container,
                    forceFit: true,
                    height: this.height,
                    padding: [50, 0],
                    background: {
                        fill: "#fff"
                    }
                })
                //Tooltip（提示信息）和 Legend（图例）仅在 Chart 上支持
                chart.legend(false);
                chart.tooltip({
                    showTitle: false,
                    itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{type}: {value}</li>'
                });

                let view1 = chart.view({
                    start: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 0.5,
                        y: 1
                    }
                });
                view1.scale("value",{
                    formatter(val){
                        return val + "%"
                    }
                })
                view1.coord('theta', {
                    radius: 0.8,
                    startAngle: 0 + otherOffsetAngle,
                    endAngle: Math.PI * 2 + otherOffsetAngle
                });
                view1.source(data);
                view1.intervalStack().position('value').color('type', ['#38c060', '#2593fc']).label('value', {
                    offset: -20,
                    useHtml: true,
                    htmlTemplate(val, item) {
                        return '<span style="color:#fff">' + item.point.type + '<br/>' + val + '</span>';
                    }
                }).tooltip('type*value', (type, value) => {
                    return {
                        type: type,
                        value: value + '%'
                    };
                })

                let view2 = chart.view({
                    start: {
                        x: 0.5,
                        y: 0.1
                    },
                    end: {
                        x: 1,
                        y: 0.9
                    }
                });
                view2.axis(false);
                view2.source(otherData, {
                    value: {
                        nice: false
                    }
                });
                view2.intervalStack().position('1*value').color('type', ['#063d8a', '#0b53b0', '#1770d6', '#2593fc',
                    '#47abfc',
                    '#6dc1fc', '#94d6fd', '#bbe7fe'
                ]).label('value', {
                    position: 'right',
                    offsetX: 5,
                    offsetY: 10,
                    formatter(text, item) {
                        let d = item.point;
                        return d.type + ' ' + d.value + '%';
                    }
                });
                chart.render();
                drawLinkArea();
                chart.on('afterpaint', function () {
                    drawLinkArea();
                });
            },
        }
    }
</script>
