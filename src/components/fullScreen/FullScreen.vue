<template>
<!-- 页面全屏 -->
  <el-tooltip effect="dark" :content="isFullScreen ? '取消全屏' : '全屏浏览'" placement="bottom">
    <i class="el-icon-rank" @click="handleFullScreen"></i>
  </el-tooltip>
</template>

<script>
  export default {
    data() {
      return {
        isFullScreen: false,
      }
    },
    methods: {
      handleFullScreen() {
        if (this.isFullScreen) {
          const doc = document;
          const exitFullScreen =
            doc.exitFullscreen ||
            doc.webkitCancelFullScreen ||
            doc.mozCancelFullScreen ||
            doc.msExitFullscreen
          if (exitFullScreen) {
            exitFullScreen.call(doc);
          }
        } else {
          const htmlDOM = document.documentElement;
          const enterFullScreen =
            htmlDOM.requestFullscreen ||
            htmlDOM.webkitRequestFullScreen ||
            htmlDOM.mozRequestFullScreen ||
            htmlDOM.msRequestFullscreen
          if (enterFullScreen) {
            enterFullScreen.call(htmlDOM);
          } else {
            this.$message({
              type: 'warning',
              message: '您的浏览器不支持全屏浏览，请升级或更换浏览器！'
            })
          }
        }
        this.isFullScreen = !this.isFullScreen
      },
    }
  }
</script>

<style scoped>
  .el-icon-rank {
    font-size: 30px;
    color: #fff;
    transform: rotateZ(45deg);
    transform-origin: 15px -10px;
    cursor: pointer;
  }
</style>
