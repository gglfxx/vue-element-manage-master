<template>
  <el-tabs v-model="activeName" type="border-card">
    <el-tab-pane label="标记点" name="maker">
      <keep-alive>
        <map-maker v-if="activeName === 'maker'" />
      </keep-alive>
    </el-tab-pane>

    <el-tab-pane label="插件" name="plugin">
      <keep-alive>
        <map-plugin v-if="activeName === 'plugin'" />
      </keep-alive>
    </el-tab-pane>

    <el-tab-pane label="地图热点" name="hotSpot">
      <keep-alive>
        <map-hot-spot v-if="activeName === 'hotSpot'" />
      </keep-alive>
    </el-tab-pane>

  </el-tabs>
</template>

<script>
  import MapMaker from './components/MapMaker';
  import MapPlugin from './components/MapPlugin';
  import MapHotSpot from './components/MapHotSpot';

  export default {
    name: 'AMap',
    components: {
      MapMaker,
      MapPlugin,
      MapHotSpot
    },
    data() {
      return {
        activeName: 'maker'
      }
    }
  }
</script>
