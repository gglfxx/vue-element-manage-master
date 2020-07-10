const InnerLayout = () => import( /* webpackChunkName:'innerLayout' */ '@/layouts/innerLayout');
const Permission = () => import( /* webpackChunkName:'permission' */ '@/pages/permission');

const route = {
  path: '/permission',
  component: InnerLayout,
  redirect: '/permission/index',
  meta: {
    title: '权限控制',
    icon: 'permission'
  },
  children: [{
    name: 'Permission',
    path: '/permission/index',
    component: Permission,
    meta: {
      title: '权限控制',
      activePath: '/permission'
    },
  }]
}

export default route;
