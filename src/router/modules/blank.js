const InnerLayout = () => import( /* webpackChunkName:'innerLayout' */ '@/layouts/innerLayout');
const Blank = () => import( /* webpackChunkName:'blank' */ '@/pages/blank');

const route = {
  path: '/blank',
  component: InnerLayout,
  redirect: '/blank/index',
  meta: {
    title: '空白页',
    icon: 'blank'
  },
  children: [{
    name: 'Blank',
    path: '/blank/index',
    component: Blank,
    meta: {
      title: '空白页',
      activePath: '/blank',
    },
  }]
}

export default route;
