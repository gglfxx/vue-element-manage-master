import Mock from 'mockjs';

const loginInfo = Mock.mock({
  token: '@lower(@guid)',
})

const userInfo = Mock.mock({
  id: '@lower(@guid)',
  name: '@cname',
  gender: '@pick(["男", "女"])',
  avatar: 'https://s2.ax1x.com/2019/08/02/edRc1P.jpg',
  email: '@email',
  mobilePhone: /^1[345789]\d{9}$/,
  roles: ['admin']
})


export default {
  login(config) {
    const { username } = JSON.parse(config.body);
    if (username === 'editor') {
      loginInfo.token = 'd02fd62b-cfdf-9efb-adfb-7fc1e85bf99c';
    } else if (username === 'guest') {
      loginInfo.token = 'ecfe1e6b-cba6-dfee-fdba-12015b7f2420';
    } else {
      loginInfo.token = '6f81bbab-5b7e-abfb-bd44-efd5aeee82cc';
    }
    return {
      code: 200,
      data: loginInfo
    }
  },
  logout() {
    return {
      code: 200,
      data: {}
    }
  },
  getUserInfo(config) {
    const { token } = JSON.parse(config.body);
    if (token === 'd02fd62b-cfdf-9efb-adfb-7fc1e85bf99c') {
      userInfo.roles = ['editor'];
    } else if (token === 'ecfe1e6b-cba6-dfee-fdba-12015b7f2420') {
      userInfo.roles = ['guest'];
    } else {
      userInfo.roles = ['admin'];
    }
    return {
      code: 200,
      data: userInfo
    }
  },
  getCaptcha(config) {
    return {
      code: 200,
      data: {

      }
    }
  },
  register(config) {
    return {
      code: 200,
      data: {

      }
    }
  },
  modifyPassword(config) {
    return {
      code: 200,
      data: {

      }
    }
  },
}
