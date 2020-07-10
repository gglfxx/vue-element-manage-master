const OuterLayout = () => import( /* webpackChunkName:'outerLayout' */ '@/layouts/outerLayout');
const Login = () => import( /* webpackChunkName:'login' */ '@/pages/account/login');
const Register = () => import( /* webpackChunkName:'register' */ '@/pages/account/register');
const Forget = () => import( /* webpackChunkName:'forget' */ '@/pages/account/forget');


const route = {
  path: '/account',
  component: OuterLayout,
  meta: {
    hiddenInMenu: true
  },
  children: [{
    name: 'Login',
    path: '/account/login',
    component: Login,
    meta: {
      title: '登录',
    }
  }, {
    name: 'Register',
    path: '/account/register',
    component: Register,
    meta: {
      title: '注册',
    }
  }, {
    name: 'Forget',
    path: '/account/forget',
    component: Forget,
    meta: {
      title: '忘记密码',
    }
  }]
}


export default route;
