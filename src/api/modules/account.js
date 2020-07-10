import service from '@/utils/service';



// 登录
export const login = (data) => service.post('/account/login', data);

// 退出登录
export const logout = (data) => service.post('/account/logout', data);

// 获取用户信息
export const getUserInfo = (data) => service.post('/account/userInfo', data);

// 注册
export const register = (data) => service.post('/account/register', data);

// 获取验证码
export const getCaptcha = (data) => service.post('/account/captcha', data);

//  修改密码
export const modifyPassword = (data) => service.post('/account/modifyPassword', data);



