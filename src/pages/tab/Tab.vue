<template>
  <div>
    <p>el-tab组件会一次性将所有pane中的数据获取完。使用v-if来按需加载对应的pane,使用keep-alive做缓存。</p>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane v-for="tab in tabOptions" :key="tab.name" :label="tab.label" :name="tab.name">
        <keep-alive>
          <tab-pane v-if="activeName === tab.name" :name="tab.name" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import TabPane from './components/TabPane';

  export default {
    name: 'Tab',
    components: {
      TabPane
    },
    data() {
      return {
        activeName: 'first',
        tabOptions: [{
          label: '标签页一',
          name: 'first'
        }, {
          label: '标签页二',
          name: 'second'
        }, {
          label: '标签页三',
          name: 'third'
        }, {
          label: '标签页四',
          name: 'fourth'
        }]
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>
