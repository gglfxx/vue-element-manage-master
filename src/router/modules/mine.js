const InnerLayout = () => import( /* webpackChunkName:'innerLayout' */ '@/layouts/innerLayout');
const Mine = () => import( /* webpackChunkName:'mine' */ '@/pages/mine');

const route = {
  path: '/mine',
  component: InnerLayout,
  redirect: '/mine/index',
  meta: {
    title: '个人中心',
    hiddenInMenu: true
  },
  children: [{
    name: 'Mine',
    path: '/mine/index',
    component: Mine,
    meta: {
      title: '个人中心'
    },
  }]
}

export default route;
