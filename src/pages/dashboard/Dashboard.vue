<template>
  <div>
    <statistic @onChangeType="hanldeChangeType" />
    <line-chart :statistic-type="statisticType" />

    <el-row :gutter="20">
      <el-col :span="8">
        <todo-list />
      </el-col>
      <el-col :span="8">
        <progress-bar />
      </el-col>
      <el-col :span="8">
        <new-goods />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Statistic from './components/Statistic';
  import LineChart from './components/LineChart';
  import TodoList from './components/TodoList';
  import ProgressBar from './components/ProgressBar';
  import NewGoods from './components/NewGoods';

  export default {
    name: 'Dashboard',
    components: {
      Statistic,
      LineChart,
      TodoList,
      ProgressBar,
      NewGoods
    },
    data() {
      return {
        statisticType: 'visite'
      }
    },
    methods: {
      hanldeChangeType(type) {
        this.statisticType = type;
      }
    },
  }
</script>
