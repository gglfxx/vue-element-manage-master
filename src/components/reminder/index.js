import Vue from 'vue';
import Reminder from './Reminder';

// 使用Vue的基础构造函数创建一个子类，参数是组件选项对象。
let RemindConstructor = Vue.extend(Reminder);

// 参数处理
let argManage = function (options) {
  options = options || {};
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  return options;
}

let reminder = function (options) {
  options = argManage(options);
  // 创建实例
  // 手动挂载实例，不传参数，模板被渲染为html文档之外的元素(文档碎片)，之后可以用原生DOM方法插入到文档中。
  let vm = new RemindConstructor({
    data: options
  }).$mount();
  // 将实例插入到html文档中.这样挂载不会覆盖掉挂载元素的内容，仅仅是添加到body最后。
  document.body.appendChild(vm.$el);

  // 必须先将组件实例挂载之后再显示，不然不会出现显示时的动画效果。
  vm.visible = true;
  // 执行this.$reminder或reminder()方法将会返回reminder组件实例，然后可以调用实例的close()方法关闭。
  return vm;
}

//设置每种类型调用的别名
const TYPES = ['success', 'warning', 'info', 'error', 'loading'];
TYPES.forEach(type => {
  reminder[type] = options => {
    options = argManage(options);
    options.type = type;
    return reminder(options);
  };
});

export default reminder;
