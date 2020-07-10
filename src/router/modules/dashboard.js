const InnerLayout = () => import( /* webpackChunkName:'innerLayout' */ '@/layouts/innerLayout');
const Dashboard = () => import( /* webpackChunkName:'dashboard' */ '@/pages/dashboard');

const route = {
  path: '/dashboard',
  component: InnerLayout,
  redirect: '/dashboard/index',
  meta: {
    title: '首页',
    icon: 'home',
  },
  children: [{
    name: 'Dashboard',
    path: '/dashboard/index',
    component: Dashboard,
    meta: {
      title: '首页',
      activePath: '/dashboard'
    },
  }]
}

export default route;
