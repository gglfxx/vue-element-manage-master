import Mock from 'mockjs';

import account from './modules/account';
import baseTable from './modules/baseTable';
import dashboard from './modules/dashboard';
import article from './modules/article';
import user from './modules/user';
import tab from './modules/tab';

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function () {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false;
  }
  this.proxy_send(...arguments);
}


//延时数据返回
Mock.setup({
  timeout: '300-800'
})


Mock.mock(/\/account\/login/, 'post', account.login);
Mock.mock(/\/account\/logout/, 'post', account.logout);
Mock.mock(/\/account\/userInfo/, 'post', account.getUserInfo);
Mock.mock(/\/account\/captcha/, 'post', account.getCaptcha);
Mock.mock(/\/account\/register/, 'post', account.register);
Mock.mock(/\/account\/modifyPassword/, 'post', account.modifyPassword);


Mock.mock(/\/baseTable/, 'get', baseTable.getBaseTable);

Mock.mock(/\/dashboard\/grid/, 'get', dashboard.getGridData);
Mock.mock(/\/dashboard\/lineChart/, 'get', dashboard.getLineChartData);
Mock.mock(/\/dashboard\/todoList/, 'get', dashboard.getTodoListData);


Mock.mock(/\/article\/list/, 'get', article.getList);
Mock.mock(/\/article\/detail/, 'get', article.getDetail);
Mock.mock(/\/article\/update/, 'post', article.update);
Mock.mock(/\/article\/remove/, 'post', article.remove);


Mock.mock(/\/user\/list/, 'get', user.getList);
Mock.mock(/\/user\/detail/, 'get', user.getDetail);
Mock.mock(/\/user\/update/, 'post', user.update);
Mock.mock(/\/user\/remove/, 'post', user.remove);


Mock.mock(/\/tab\/list/, 'get', tab.getList);

export default Mock;
