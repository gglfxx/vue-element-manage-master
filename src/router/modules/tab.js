const InnerLayout = () => import( /* webpackChunkName:'innerLayout' */ '@/layouts/innerLayout');
const Tab = () => import( /* webpackChunkName:'tab' */ '@/pages/tab');

const route = {
  path: '/tab',
  component: InnerLayout,
  redirect: '/tab/index',
  meta: {
    title: 'Tab选项卡',
    icon: 'tab'
  },
  children: [{
    name: 'Tab',
    path: '/tab/index',
    component: Tab,
    meta: {
      title: 'Tab选项卡',
      activePath: '/tab'
    },
  }]
}

export default route;
