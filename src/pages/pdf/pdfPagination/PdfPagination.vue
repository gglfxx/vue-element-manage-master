<template>
  <div class="pdf-pagination">
    <div
      class="pdf-pagination__canvas"
      v-loading="fileLoading"
      element-loading-spinner="el-icon-loading"
      element-loading-text="文件加载中">
      <canvas ref="canvas"></canvas>
    </div>

    <el-pagination
      layout="prev, pager, next,jumper"
      :page-size="1"
      :total="totalPage"
      @current-change="handleCurrentChange"
      background>
    </el-pagination>
  </div>
</template>

<script>
  import pdfjs from 'pdfjs-dist';
  import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

  export default {
    name:'PdfPagination',
    data() {
      return {
        pdfDoc: null,
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
        const loadingTask = pdfjs.getDocument(this.fileUrl);
        loadingTask.promise.then((pdf) => {
          this.pdfDoc = pdf;
          this.totalPage = pdf.numPages;
          this.renderPage(1);
        }).catch(() => {
          this.$message.error('文件加载失败！');
          this.fileLoading = false;
        })
      },
      // 渲染canvas
      renderPage(pageNumber) {
        this.pdfDoc.getPage(pageNumber).then((page) => {
          const desiredWidth = 800;
          const viewport = page.getViewport({ scale: 1 });
          const scale = desiredWidth / viewport.width;
          const scaledViewport = page.getViewport({ scale });

          const canvas = this.$refs.canvas;
          const context = canvas.getContext('2d');
          canvas.height = scaledViewport.height;
          canvas.width = scaledViewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: scaledViewport
          };
          page.render(renderContext);
        });
      },
      // 翻页
      handleCurrentChange(pageNumber) {
        this.renderPage(pageNumber);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pdf-pagination {
    height: 100%;

    .el-pagination {
      text-align: center;
      margin: 1em 0;
    }

    .pdf-pagination__canvas {
      min-height: 100%;
      width: 800px;
      margin: 0 auto;
    }
  }
</style>
