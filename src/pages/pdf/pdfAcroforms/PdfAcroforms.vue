<template>
  <div class="pdf-acroforms">

    <div class="pdf-acroforms__tip">
      <p>参考的是pdf.js官方例子：
        <a href="https://github.com/mozilla/pdf.js/tree/master/examples/acroforms" target="_blank">acroforms</a></p>
      <p>清晰度更高。</p>
    </div>

    <div
      class="pdf-acroforms__container"
      ref="container"
      v-loading="fileLoading"
      element-loading-spinner="el-icon-loading"
      element-loading-text="文件加载中">
    </div>
  </div>
</template>


<script>
  import pdfjs from 'pdfjs-dist';
  import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
  import * as pdfjsViewer from '../../../../node_modules/pdfjs-dist/web/pdf_viewer.js'
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;


  export default {
    name:'PdfAcroforms',
    data() {
      return {
        fileLoading: false,
        fileUrl: 'http://www.xdocin.com/xdoc?_key=t7t7z6j54vezfdnwptijcmo63i&_func=down&_dir=math.pdf'
      }
    },
    created() {

    },
    mounted() {
      this.loadFile();
    },
    methods: {
      // 加载pdf文件
      loadFile() {
        this.fileLoading = true;
        const loadingTask = pdfjs.getDocument(this.fileUrl);
        loadingTask.promise.then((pdf) => {
          const totalPage = pdf.numPages;
          for (let i = 1; i <= totalPage; i++) {
            this.renderPage(pdf, i);
          }
          this.fileLoading = false;
        }).catch(() => {
          this.$message.error('文件加载失败！');
          this.fileLoading = false;
        })
      },
      renderPage(pdfDoc, pageNumber) {
        pdfDoc.getPage(pageNumber).then(page => {
          const pdfPageView = new pdfjsViewer.PDFPageView({
            container: this.$refs.container,
            id: pageNumber,
            scale: 1,
            defaultViewport: page.getViewport({ scale: 1 }),
            annotationLayerFactory: new pdfjsViewer.DefaultAnnotationLayerFactory(),
            renderInteractiveForms: true,
          });
          pdfPageView.setPdfPage(page);
          pdfPageView.draw();
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .pdf-acroforms {
    height: 100%;

    .pdf-acroforms__tip {
      margin-bottom: 1em;
    }

    .pdf-acroforms__container {
      min-height: 100%;
      width: 800px;
      margin: 0 auto;
    }
  }
</style>
<style lang="scss">
  .pdf-acroforms {
    .page {
      margin-bottom: 1em;
    }
  }
</style>
