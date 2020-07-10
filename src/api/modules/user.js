import service from '@/utils/service';
import { paramsSerializer } from '@/utils/core';


// 获取用户列表
export const getList = (data) => service.get('/user/list', data, {
  paramsSerializer(params) {
    return paramsSerializer(params);
  }
});

// 获取用户详情
export const getDetail = (data) => service.get('/user/detail', data);

// 新增/修改用户
export const update = (data) => service.post('/user/update', data);

// 删除用户
export const remove = (data) => service.post('/user/remove', data);
