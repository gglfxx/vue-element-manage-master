<template>
  <div>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="指令方式" name="directive">
        <Directive />
      </el-tab-pane>

      <el-tab-pane label="组件方式" name="component">
        <comp />
      </el-tab-pane>

      <el-tab-pane label="bug" name="bug">
        <bug />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Directive from './components/Directive';
  import Comp from './components/Comp';
  import Bug from './components/Bug';


  export default {
    name: 'Copy',
    components: {
      Directive,
      Comp,
      Bug
    },
    data() {
      return {
        activeName: 'directive',
      }
    },
  }
</script>
