import Mock from 'mockjs';
import { getURLParams } from "@/utils/core";


const firstData = Mock.mock({
  "list|7": [{
    name: "@cname",
    age: "@natural(30,40)",
    gender: '@pick(["男", "女"])',
    email: "@email",
    mobilePhone: /^1[345789]\d{9}$/,
  }]
})

const secondData = Mock.mock({
  "list|10": [{
    name: "@cname",
    age: "@natural(30,40)",
    gender: '@pick(["男", "女"])',
    email: "@email",
    mobilePhone: /^1[345789]\d{9}$/,
  }]
})

const thirdData = Mock.mock({
  "list|6": [{
    name: "@cname",
    age: "@natural(30,40)",
    gender: '@pick(["男", "女"])',
    email: "@email",
    mobilePhone: /^1[345789]\d{9}$/,
  }]
})

const fourthData = Mock.mock({
  "list|12": [{
    name: "@cname",
    age: "@natural(30,40)",
    gender: '@pick(["男", "女"])',
    email: "@email",
    mobilePhone: /^1[345789]\d{9}$/,
  }]
})


export default {
  getList(config) {
    const { name } = getURLParams(config.url);
    let data = {};
    switch (name) {
      case 'first':
        data = firstData.list;
        break;
      case 'second':
        data = secondData.list;
        break;
      case 'third':
        data = thirdData.list;
        break;
      case 'fourth':
        data = fourthData.list;
        break;
      default:
        data = {};
    }
    return {
      code: 200,
      data
    }
  }
}
