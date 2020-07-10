const InnerLayout = () => import( /* webpackChunkName:'innerLayout' */ '@/layouts/innerLayout');
const LineChart = () => import( /* webpackChunkName:'lineChart' */ '@/pages/chart/lineChart');
const AreaChart = () => import( /* webpackChunkName:'areaChart' */ '@/pages/chart/areaChart');
const PillarChart = () => import( /* webpackChunkName:'pillarChart' */ '@/pages/chart/pillarChart');
const BarChart = () => import( /* webpackChunkName:'barChart' */ '@/pages/chart/barChart');
const PieChart = () => import( /* webpackChunkName:'pieChart' */ '@/pages/chart/pieChart');
const PointChart = () => import( /* webpackChunkName:'pointChart' */ '@/pages/chart/pointChart');
const RadarChart = () => import( /* webpackChunkName:'radarChart' */ '@/pages/chart/radarChart');


const route = {
  name: 'Chart',
  path: '/chart',
  component: InnerLayout,
  meta: {
    title: '图表',
    icon: 'chart'
  },
  children: [{
    name: 'LineChart',
    path: '/chart/lineChart',
    component: LineChart,
    meta: {
      title: '折线图',
    }
  }, {
    name: 'AreaChart',
    path: '/chart/areaChart',
    component: AreaChart,
    meta: {
      title: '面积图',
    }
  }, {
    name: 'PillarChart',
    path: '/chart/pillarChart',
    component: PillarChart,
    meta: {
      title: '柱状图',
    }
  }, {
    name: 'BarChart',
    path: '/chart/barChart',
    component: BarChart,
    meta: {
      title: '条形图',
    }
  }, {
    name: 'PieChart',
    path: '/chart/pieChart',
    component: PieChart,
    meta: {
      title: '饼状图',
    }
  }, {
    name: 'PointChart',
    path: '/chart/pointChart',
    component: PointChart,
    meta: {
      title: '点状图',
    }
  }, {
    name: 'RadarChart',
    path: '/chart/radarChart',
    component: RadarChart,
    meta: {
      title: '雷达图',
    }
  }]
}

export default route;
