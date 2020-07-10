const InnerLayout = () => import( /* webpackChunkName:'innerLayout' */ '@/layouts/innerLayout');
const User = () => import( /* webpackChunkName:'user' */ '@/pages/user');

const route = {
  path: '/user',
  component: InnerLayout,
  redirect: '/user/index',
  meta: {
    title: '用户管理',
    icon: 'user'
  },
  children: [{
    name: 'User',
    path: '/user/index',
    component: User,
    meta: {
      title: '用户管理',
      activePath: '/user'
    },
  }]
}

export default route;
