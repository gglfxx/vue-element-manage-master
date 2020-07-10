import { guid } from '@/utils/core';

/**
 * 过滤对象的属性，数据表中有些字段前端不需要，可以使用此方法过滤掉
 * @param {String} fields 可变参数，需要的字段
 */
const filterFieldByRow = (row, ...fields) => {
  const keys = Object.keys(row);
  const newRow = {};
  keys.forEach(key => {
    if (fields.includes(key)) {
      newRow[key] = row[key];
    }
  })
  return newRow;
}


const filterFieldByTable = (table, ...fields) => {
  return table.map(row => filterFieldByRow(row, ...fields))
}



/**
 * 新增/修改
 */
const update = (table, row) => {
  if (row.id) {
    const index = table.findIndex(item => item.id === row.id);
    Object.assign(table[index], row);
  } else {
    row.id = guid();
    table.unshift(row);
  }
}


/**
 * 单个删除/批量删除
 * @param {Array} ids   要删除的项的id组成的数组
 */
const remove = (table, ids) => {
  ids.forEach(id => {
    const index = table.findIndex(row => row.id === id);
    table.splice(index, 1);
  })
}


/**
 * 根据id查找表的某一项
 */
const find = (table, id) => {
  return table.find(row => row.id === id);
}


export default {
  filterFieldByRow,
  filterFieldByTable,
  update,
  remove,
  find,
}
