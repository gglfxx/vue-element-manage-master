import Mock from 'mockjs';
import { getURLParams } from '@/utils/core';
import util from '../util';


const userData = Mock.mock({
  'list|127': [{
    id: '@lower(@guid)',
    name: '@cname',
    mobilePhone: /^1[345789]\d{9}$/,
    gender: '@pick(["1", "2"])',
    age: '@natural(20,60)',
    roles: '@pick(["admin", "guest","editor"])'.split(),
    createDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
    consume: '@natural(0,10000)',
    account: /^[a-zA-Z0-9_]{5,10}$/,
    avatar: 'https://picsum.photos/200/200/?random',
    email: '@email'
  }]
})

const table = userData.list;


export default {
  getList(config) {
    const { name, pageNumber = 1, pageSize = table.length } = getURLParams(config.url);
    const result = table.filter(row => {
      let validName = false;
      validName = row.name.includes(name);
      return validName;
    })
    const startIndex = (Number(pageNumber) - 1) * Number(pageSize);
    const endIndex = startIndex + Number(pageSize);
    return {
      code: 200,
      data: {
        list: util.filterFieldByTable(result.slice(startIndex, endIndex), 'id', 'name', 'mobilePhone', 'gender', 'roles', 'createDate', 'consume', 'age'),
        total: result.length
      }
    }
  },
  getDetail(config) {
    const { id } = getURLParams(config.url);
    return {
      code: 200,
      data: util.find(table, id)
    }
  },
  update(config) {
    const { detail } = window.JSON.parse(config.body);
    if (!detail.id) {
      const initRow = {
        createDate: Date.now(),
        consume: 0
      };
      Object.assign(detail, initRow);
    }
    util.update(table, detail);
    return {
      code: 200,
      data: {}
    }
  },
  remove(config) {
    const { id } = window.JSON.parse(config.body);
    util.remove(table, id);
    return {
      code: 200,
      data: {}
    }
  }
}

