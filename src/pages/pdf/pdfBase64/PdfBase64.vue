<template>
  <div class="pdf-base64">
    <p class="pdf-base64__tip">pdf文件数据为base64</p>
    <div
      class="pdf-base64__canvas"
      v-loading="fileLoading"
      element-loading-spinner="el-icon-loading"
      element-loading-text="文件加载中">
      <canvas v-for="item in totalPage" :key="item" :id='"the-canvas" + item'></canvas>
    </div>
  </div>
</template>

<script>
  import pdfjs from 'pdfjs-dist';
  import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
  import data from './data';
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

  export default {
    name: 'PdfBase64',
    data() {
      return {
        fileLoading: false,
        totalPage: 0,
      }
    },
    created() {
      this.loadFile();
    },
    methods: {
      //将base64数据解码
      decodeBase64(data) {
        //[RFC2045]中有规定：base64一行不能超过76字符，超过则添加回车换行符。因此需要把base64字段中的换行符，回车符给去掉。
        // 如果后端返回的base64数据带有MIME类型，需要从MIME类型之后开始清除换行和回车符。
        // 如果不带MIME类型，直接去除回车和换行，然后使用atob解码(不需要手动加上MIME类型头)。
        const maker = ';base64,';
        let dataURI = '';
        if (data.indexOf(maker) > -1) {
          const base64Index = data.indexOf(maker) + maker.length;
          dataURI = data.substring(base64Index).replace(/[\r\n]/g, '');
        } else {
          dataURI = data.replace(/[\r\n]/g, '');
        }

        return window.atob(dataURI);
      },
      // 加载pdf文件
      loadFile() {
        this.fileLoading = true;
        const loadingTask = pdfjs.getDocument({
          data: this.decodeBase64(data)
        });
        loadingTask.promise.then((pdf) => {
          const totalPage = pdf.numPages;
          this.totalPage = totalPage;
          for (let i = 1; i <= totalPage; i++) {
            this.renderPage(pdf, i);
          }
          this.fileLoading = false;
        }).catch(() => {
          this.$message.error('文件加载失败！');
          this.fileLoading = false;
        })
      },
      // 以canvas的形式渲染
      renderPage(pdfDoc, pageNumber) {
        pdfDoc.getPage(pageNumber).then((page) => {
          const desiredWidth = 800;
          const viewport = page.getViewport({ scale: 1 });
          const scale = desiredWidth / viewport.width;
          const scaledViewport = page.getViewport({ scale });

          const canvas = document.getElementById('the-canvas' + pageNumber);
          const context = canvas.getContext('2d');
          canvas.height = scaledViewport.height;
          canvas.width = scaledViewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: scaledViewport
          };
          page.render(renderContext);
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .pdf-base64 {
    height: 100%;

    .pdf-base64__tip {
      margin-bottom: 1em;
    }

    .pdf-base64__canvas {
      min-height: 100%;
      width: 800px;
      margin: 0 auto;
    }
  }
</style>
