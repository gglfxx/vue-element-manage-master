<template>
  <div id="hotSpot"></div>
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
      //创建信息窗口
      createContent(poi) {
        const content = [];
        content.push(`<div class="info-title">${poi.name}</div><div class="info-content">地址：${poi.address}`);
        content.push('电话：' + poi.tel);
        content.push('类型：' + poi.type);
        content.push('<div>');
        return content.join('<br>');
      },
      //加载地图插件
      loadPlugin(map) {
        map.plugin(['AMap.PlaceSearch', 'AMap.AdvancedInfoWindow'], () => {
          //地点查询
          const placeSearch = new AMap.PlaceSearch();
          const infoWindow = new AMap.AdvancedInfoWindow({});
          map.on('hotspotover', (result) => {
            placeSearch.getDetails(result.id, (status, result) => {
              if (status === 'complete' && result.info === 'OK') {
                var poiArr = result.poiList.pois;
                var location = poiArr[0].location;
                infoWindow.setContent(this.createContent(poiArr[0]));
                infoWindow.open(map, location);
              }
            });
          });
        });
      },
      // 初始化地图
      initMap() {
        const map = new AMap.Map('hotSpot', {
          // 地图中心点
          center: [116.397428, 39.90923],
          // 初始缩放级别级别
          zoom: 13,
          isHotspot: true
        });
        this.loadPlugin(map);
      }
    },
  }
</script>
<style lang="scss">
  #hotSpot {
    height: 400px;

    .map {
      height: 100%;
      width: 100%;
      float: left;
    }

    .info-title {
      font-weight: bolder;
      color: #fff;
      font-size: 14px;
      line-height: 26px;
      padding: 0 0 0 6px;
      background: #25A5F7
    }

    .info-content {
      padding: 4px;
      color: #666666;
      line-height: 23px;
      font: 12px Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial;
    }

    .info-content img {
      float: left;
      margin: 3px;
    }

    .amap-info-combo .keyword-input {
      height: auto;
    }

  }
</style>
