<template>
  <div class="pdf-base">
    <p class="pdf-base__tip">
      <a href="http://mozilla.github.io/pdf.js" target="_blank">pdf.js</a>
    </p>
    <div
      class="pdf-base__canvas"
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
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

  export default {
    name:'PdfBase',
    data() {
      return {
        fileLoading: false,
        fileUrl: 'http://www.xdocin.com/xdoc?_key=t7t7z6j54vezfdnwptijcmo63i&_func=down&_dir=math.pdf',
        totalPage: 0,
      }
    },
    created() {
      this.loadFile();
    },
    methods: {
      // 加载pdf文件
      loadFile() {
        this.fileLoading = true;
        const loadingTask = pdfjs.getDocument(this.fileUrl);
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
    }
  }
</script>

<style lang="scss" scoped>
  .pdf-base {
    height: 100%;

    .pdf-base__tip {
      margin-bottom: 1em;
    }

    .pdf-base__canvas {
      min-height: 100%;
      width: 800px;
      margin: 0 auto;
    }
  }
</style>
