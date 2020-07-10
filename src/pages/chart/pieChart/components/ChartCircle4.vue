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
                    type: '居住',
                    value: 7140
                }, {
                    type: '食品烟酒',
                    value: 3875
                }, {
                    type: '交通通信',
                    value: 2267
                }, {
                    type: '教育、文化、娱乐',
                    value: 1853
                }, {
                    type: '医疗保健',
                    value: 1685
                }, {
                    type: '衣着',
                    value: 1179
                }, {
                    type: '生活用品及服务',
                    value: 1088
                }, {
                    type: '其他用品及服务',
                    value: 583
                }],
            }
        },
        mounted() {
            this.createChart(this.chartId, this.chartData);
        },
        methods: {
            createChart(container, data) {
                let startAngle = -Math.PI / 2 - Math.PI / 4;
                let ds = new DataSet();
                let dv = ds.createView().source(data);
                dv.transform({
                    type: 'percent',
                    field: 'value',
                    dimension: 'type',
                    as: 'percent'
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
                chart.legend(false);
                chart.tooltip({
                    showTitle: false
                })
                chart.coord('theta', {
                    radius: 0.75,
                    innerRadius: 0.5,
                    startAngle: startAngle,
                    endAngle: startAngle + Math.PI * 2
                });
                chart.intervalStack().position('value').color('type', ['#0a4291', '#0a57b6', '#1373db', '#2295ff',
                    '#48adff',
                    '#6fc3ff', '#96d7ff', '#bde8ff'
                ]).opacity(1).label('percent', {
                    offset: -20,
                    textStyle: {
                        fill: 'white',
                        fontSize: 12
                    },
                    formatter: function formatter(val) {
                        return parseInt(val * 100) + '%';
                    }
                });
                chart.guide().html({
                    position: ['50%', '50%'],
                    html: '<div class="g2-guide-html"><p class="title">总计</p><p class="value">19670</p></div>'
                });
                chart.render();

                //绘制label
                let OFFSET = 20;
                let APPEND_OFFSET = 100;
                let LINEHEIGHT = 60;
                let coord = chart.get('coord'); // 获取坐标系对象
                let center = coord.center; // 极坐标圆心坐标
                let r = coord.radius; // 极坐标半径
                let canvas = chart.get('canvas');
                let canvasWidth = chart.get('width');
                let canvasHeight = chart.get('height');
                let labelGroup = canvas.addGroup();
                let labels = [];
                addPieLabel(chart);
                canvas.draw();
                chart.on('afterpaint', function () {
                    addPieLabel(chart);
                });
                //main
                function addPieLabel() {
                    let halves = [
                        [],
                        []
                    ];
                    let data = dv.rows;
                    let angle = startAngle;
                    for (let i = 0; i < data.length; i++) {
                        let percent = data[i].percent;
                        let targetAngle = angle + Math.PI * 2 * percent;
                        let middleAngle = angle + (targetAngle - angle) / 2;
                        angle = targetAngle;
                        let edgePoint = getEndPoint(center, middleAngle, r);
                        let routerPoint = getEndPoint(center, middleAngle, r + OFFSET);
                        //label
                        let label = {
                            _anchor: edgePoint,
                            _router: routerPoint,
                            _data: data[i],
                            x: routerPoint.x,
                            y: routerPoint.y,
                            r: r + OFFSET,
                            fill: '#bfbfbf'
                        };
                        // 判断文本的方向
                        if (edgePoint.x < center.x) {
                            label._side = 'left';
                            halves[0].push(label);
                        } else {
                            label._side = 'right';
                            halves[1].push(label);
                        }
                    } // end of for
                    let maxCountForOneSide = parseInt(canvasHeight / LINEHEIGHT, 10);
                    halves.forEach(function (half, index) {
                        // step 2: reduce labels
                        if (half.length > maxCountForOneSide) {
                            half.sort(function (a, b) {
                                return b._percent - a._percent;
                            });
                            half.splice(maxCountForOneSide, half.length - maxCountForOneSide);
                        }
                        // step 3: distribute position (x and y)
                        half.sort(function (a, b) {
                            return a.y - b.y;
                        });
                        antiCollision(half, index);
                    });
                }

                function getEndPoint(center, angle, r) {
                    return {
                        x: center.x + r * Math.cos(angle),
                        y: center.y + r * Math.sin(angle)
                    };
                }

                function drawLabel(label) {
                    let _anchor = label._anchor,
                        _router = label._router,
                        fill = label.fill,
                        y = label.y;
                    let labelAttrs = {
                        y: y,
                        fontSize: 12, // 字体大小
                        fill: '#808080',
                        text: label._data.type + '\n' + label._data.value,
                        textBaseline: 'bottom'
                    };
                    let lastPoint = {
                        y: y
                    };
                    if (label._side === 'left') {
                        // 具体文本的位置
                        lastPoint.x = APPEND_OFFSET;
                        labelAttrs.x = APPEND_OFFSET; // 左侧文本左对齐并贴着画布最左侧边缘
                        labelAttrs.textAlign = 'left';
                    } else {
                        lastPoint.x = canvasWidth - APPEND_OFFSET;
                        labelAttrs.x = canvasWidth - APPEND_OFFSET; // 右侧文本右对齐并贴着画布最右侧边缘
                        labelAttrs.textAlign = 'right';
                    }
                    // 绘制文本
                    let text = labelGroup.addShape('Text', {
                        attrs: labelAttrs
                    });
                    labels.push(text);
                    // 绘制连接线
                    let points = void 0;
                    if (_router.y !== y) {
                        // 文本位置做过调整
                        points = [
                            [_anchor.x, _anchor.y],
                            [_router.x, y],
                            [lastPoint.x, lastPoint.y]
                        ];
                    } else {
                        points = [
                            [_anchor.x, _anchor.y],
                            [_router.x, _router.y],
                            [lastPoint.x, lastPoint.y]
                        ];
                    }
                    labelGroup.addShape('polyline', {
                        attrs: {
                            points: points,
                            lineWidth: 1,
                            stroke: fill
                        }
                    });
                }

                function antiCollision(half, isRight) {
                    let startY = center.y - r - OFFSET - LINEHEIGHT;
                    let overlapping = true;
                    let totalH = canvasHeight;
                    let i = void 0;
                    let maxY = 0;
                    let minY = Number.MIN_VALUE;
                    let boxes = half.map(function (label) {
                        let labelY = label.y;
                        if (labelY > maxY) {
                            maxY = labelY;
                        }
                        if (labelY < minY) {
                            minY = labelY;
                        }
                        return {
                            size: LINEHEIGHT,
                            targets: [labelY - startY]
                        };
                    });
                    if (maxY - startY > totalH) {
                        totalH = maxY - startY;
                    }
                    while (overlapping) {
                        boxes.forEach(function (box) {
                            let target = (Math.min.apply(minY, box.targets) + Math.max.apply(minY, box.targets)) /
                                2;
                            box.pos = Math.min(Math.max(minY, target - box.size / 2), totalH - box.size);
                        });
                        // detect overlapping and join boxes
                        overlapping = false;
                        i = boxes.length;
                        while (i--) {
                            if (i > 0) {
                                let previousBox = boxes[i - 1];
                                let box = boxes[i];
                                if (previousBox.pos + previousBox.size > box.pos) {
                                    // overlapping
                                    previousBox.size += box.size;
                                    previousBox.targets = previousBox.targets.concat(box.targets);
                                    // overflow, shift up
                                    if (previousBox.pos + previousBox.size > totalH) {
                                        previousBox.pos = totalH - previousBox.size;
                                    }
                                    boxes.splice(i, 1); // removing box
                                    overlapping = true;
                                }
                            }
                        }
                    }
                    // step 4: normalize y and adjust x
                    i = 0;
                    boxes.forEach(function (b) {
                        let posInCompositeBox = startY; // middle of the label
                        b.targets.forEach(function () {
                            half[i].y = b.pos + posInCompositeBox + LINEHEIGHT / 2;
                            posInCompositeBox += LINEHEIGHT;
                            i++;
                        });
                    });
                    // (x - cx)^2 + (y - cy)^2 = totalR^2
                    half.forEach(function (label) {
                        let rPow2 = label.r * label.r;
                        let dyPow2 = Math.pow(Math.abs(label.y - center.y), 2);
                        if (rPow2 < dyPow2) {
                            label.x = center.x;
                        } else {
                            let dx = Math.sqrt(rPow2 - dyPow2);
                            if (!isRight) {
                                // left
                                label.x = center.x - dx;
                            } else {
                                // right
                                label.x = center.x + dx;
                            }
                        }
                        drawLabel(label);
                    });
                }

            },
        }
    }
</script>