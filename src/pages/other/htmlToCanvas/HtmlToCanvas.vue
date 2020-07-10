<template>
  <div class="html2canvas">
    <h4>将指定的DOM转换成图片</h4>
    <br>
    <div class="source" id="source">
      <p>文字内容文字内容文字内容文字内容文字内容文字内容文字内容</p>
      <img class="avatar" :src="dataURL">
      <p>文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容</p>
    </div>
    <br>

    <el-button type="primary" @click="download">下载图片</el-button>

    <p>#注意：如果DOM中含有图片，那么图片需要允许跨域。</p>
  </div>

</template>
<script>
  import html2canvas from 'html2canvas';

  export default {
    name: 'HtmlToCanvas',
    data() {
      return {
        imgURL: 'https://goss.veer.com/creative/vcg/veer/800water/veer-305609193.jpg' + '?v=' + +new Date(), //保证每次都会从服务器请求图片，而不是从浏览器缓存中获取。
        dataURL: 'https://goss.veer.com/creative/vcg/veer/800water/veer-305609193.jpg'
      }
    },
    created() {
      this.setBase64();
    },
    methods: {
      setBase64() {
        // 首先将图片绘制到canvas上，然后将canvas转成base64，并设置为img标签的src。
        let img = new Image(); //必须手动创建img标签。
        img.src = this.imgURL;
        img.setAttribute('crossOrigin', 'anonymous'); //必须设置，不然生成的图片的base64是空的。
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = 150; //需要设置 不然canvas默认的大小为300*150
          canvas.height = 150;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, 150, 150);
          const dataURL = canvas.toDataURL('image/png');
          this.dataURL = dataURL;
        }
      },
      download() {
        html2canvas(source, {
          scale: 2,
        }).then(canvas => {
          const dataURL = canvas.toDataURL();
          let link = document.createElement('a');
          link.style.display = 'none';
          link.href = dataURL;
          link.download = '图片';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .html2canvas {
    .source {
      width: 200px;
      height: 200px;
      background-color: aquamarine;
      text-align: center;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }

  }
</style>
