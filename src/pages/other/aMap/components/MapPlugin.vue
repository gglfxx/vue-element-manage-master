<template>
  <div id="plugin"></div>
</template>

<script>
  import { loadScript } from '@/utils/core';

  const url = 'https://webapi.amap.com/maps?v=1.4.14&key=76a35d38522a828c1f825b535a5ae4bf';

  export default {
    mounted() {
      loadScript(url, (err, res) => {
        if (!err) {
          this.initMap();
        } else {
          this.$message.error(err.message);
        }
      })
    },
    methods: {
      loadPlugin(map) {
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.OverView'], function() {
          const toolbar = new AMap.ToolBar();
          const scale = new AMap.Scale();
          const overView = new AMap.OverView();
          map.addControl(toolbar);
          map.addControl(scale);
          map.addControl(overView);
          overView.open();
        });
      },
      initMap() {
        const map = new AMap.Map('plugin', {
          zoom: 11,
          center: [116.397428, 39.90923]
        });
        this.loadPlugin(map);
      }
    },
  }
</script>
<style lang="scss">
  #plugin {
    height: 400px;

    .amap-icon img {
      width: 25px;
      height: 34px;
    }

    .amap-marker-label {
      border-color: #409eff;
      border-radius: 4px;
      padding: 6px 10px;
    }

  }
</style>
