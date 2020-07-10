import service from '@/utils/service';


export const getList = (data) => service.get('/tab/list', data);
