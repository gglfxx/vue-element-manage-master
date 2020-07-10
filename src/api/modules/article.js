import service from '@/utils/service';
import { paramsSerializer } from '@/utils/core';


// 获取文章列表
export const getList = (data) => service.get('/article/list', data, {
  paramsSerializer(params) {
    return paramsSerializer(params);
  }
})

// 获取文章详情
export const getDetail = (data) => service.get('/article/detail', data);

// 新增/修改文章
export const update = (data) => service.post('/article/update', data);

// 删除文章
export const remove = (data) => service.post('/article/remove', data);


