import service from '@/utils/service';



export const getGridData = () => service.get('/dashboard/grid');

export const getLineChartData = (data) => service.get('/dashboard/lineChart', data);

export const getTodoListData = () => service.get('/dashboard/todoList');


