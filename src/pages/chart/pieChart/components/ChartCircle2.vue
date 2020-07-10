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
                    type: '睡眠',
                    value: 70
                }, {
                    type: '淡茶 & 烟斗 & 冥想',
                    value: 10
                }, {
                    type: '写作',
                    value: 10
                }, {
                    type: '教课',
                    value: 40
                }, {
                    type: '酒吧吃肉配白酒',
                    value: 40
                }, {
                    type: '散步',
                    value: 10
                }, {
                    type: '拜访马大大',
                    value: 30
                }, {
                    type: '阅读',
                    value: 30
                }],
            }
        },
        mounted() {
            this.createChart(this.chartId, this.chartData);
        },
        methods: {
            createChart(container, userData) {
                const text = ['MIDNIGHT', '3 AM', '6 AM', '9 AM', 'NOON', '3 PM', '6 PM', '9 PM'];
                let data = [];
                for (let i = 0; i < 24; i++) {
                    data.push({
                        type: i + '',
                        value: 10
                    });
                }
                let DataView = DataSet.DataView;
                let dv = new DataView();
                dv.source(data).transform({
                    type: 'percent',
                    field: 'value',
                    dimension: 'type',
                    as: 'percent'
                });

                let chart = new G2.Chart({
                    container,
                    forceFit: true,
                    height: this.height,
                    padding: [50, 0],
                    background: {
                        fill: "#fff"
                    }
                })
                chart.legend(false);
                chart.tooltip({
                    showTitle: false
                });

                let bgView = chart.view();
                bgView.coord('theta', {
                    innerRadius: 0.9
                });
                bgView.source(dv);
                bgView.intervalStack().position('percent').color('type', ['rgba(255, 255, 255, 0)']).style({
                    stroke: '#444',
                    lineWidth: 1
                }).tooltip(false).select(false);
                bgView.guide().text({
                    position: ['50%', '50%'],
                    content: '24 hours',
                    style: {
                        lineHeight: '240px',
                        fontSize: '30',
                        fill: '#262626',
                        textAlign: 'center'
                    }
                });
                let intervalView = chart.view();
                intervalView.source(data);
                intervalView.coord('polar', {
                    innerRadius: 0.9
                });
                intervalView.axis(false);
                intervalView.interval().position('type*value').size('type', function (val) {
                    if (val % 3 === 0) {
                        return 4;
                    } else {
                        return 0;
                    }
                }).color('#444').tooltip(false).label('type', function (val) {
                    if (val % 3 === 0) {
                        return text[val / 3];
                    } else {
                        return '';
                    }
                }, {
                    offset: 15,
                    textStyle: {
                        fontSize: 12,
                        fontWeight: 'bold',
                        fill: '#bfbfbf'
                    }
                });
                let userDv = new DataView();
                userDv.source(userData).transform({
                    type: 'percent',
                    field: 'value',
                    dimension: 'type',
                    as: 'percent'
                });
                let pieView = chart.view();
                pieView.source(userDv, {
                    percent: {
                        formatter: function formatter(val) {
                            return (val * 100).toFixed(2) + '%';
                        }
                    }
                });
                pieView.coord('theta', {
                    innerRadius: 0.75
                });
                pieView.intervalStack().position('percent').color('type').label('type', {
                    offset: 40
                }).select(false);
                chart.render();


            },
        }
    }
</script>