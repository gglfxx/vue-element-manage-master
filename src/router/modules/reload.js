const InnerLayout = () => import( /* webpackChunkName:'innerLayout' */ '@/layouts/innerLayout');
const Reload = () => import( /* webpackChunkName:'reload' */ '@/pages/reload');

const route = {
  path: '/reload',
  component: InnerLayout,
  redirect: '/reload/index',
  meta: {
    hiddenInMenu: true
  },
  children: [{
    path: '/reload/index',
    component: Reload,
    meta: {
      title: '',
    },
  }]
}

export default route;
