<template>
  <div class="pdf-simple">
    <div>
      参考pdf.js官方例子：
      <a href="https://github.com/mozilla/pdf.js/blob/master/examples/components/singlepageviewer.html" target="_blank">simpleviewer</a>
      <p>优点：1.加载速度更快</p>
      <p>2.带搜索功能(自己实现搜索输入框)</p>
      <p>3.可自定义缩放模式</p>
    </div>

    <div
      class="pdf-simple__container"
      ref="container"
      v-loading="fileLoading"
      element-loading-spinner="el-icon-loading"
      element-loading-text="文件加载中">
      <div id="viewer" class="pdfViewer"></div>
    </div>

  </div>
</template>

<script>
  import pdfjs from 'pdfjs-dist';
  import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
  import * as pdfjsViewer from 'pdfjs-dist/web/pdf_viewer.js'
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

  export default {
    name:'PdfSimple',
    data() {
      return {
        fileLoading: false,
        fileUrl: 'http://www.xdocin.com/xdoc?_key=t7t7z6j54vezfdnwptijcmo63i&_func=down&_dir=math.pdf',
        // Some PDFs need external cmaps.
        cmapUrl: 'pdfjs-dist/cmaps/',
        cmapPacked: true,
        // pdf的缩放模式。可选：'auto'(自动缩放),'page-actual'(实际大小),'page-fit'(适合页面),'page-width'(适合页宽),'0.5'(缩小50%)，'1.5'(放大150%)...
        scaleMode: 'page-actual',
        // 搜索关键词
        searchText: '',
        pdfLinkService: null,
        pdfFindController: null,
        pdfViewer: null
      }
    },
    mounted() {
      this.initPdf();
      this.loadFile();
    },
    methods: {
      // 初始化一些需要的功能模块
      initPdf() {
        // 超链接功能(类似a元素的锚点，方便定位到搜索到的内容的位置)
        this.pdfLinkService = new pdfjsViewer.PDFLinkService();
        // 搜索功能
        this.pdfFindController = new pdfjsViewer.PDFFindController({
          linkService: this.pdfLinkService,
        });

        this.pdfViewer = new pdfjsViewer.PDFViewer({
          container: this.$refs.container,
          linkService: this.pdfLinkService,
          findController: this.pdfFindController,
        });
        this.pdfLinkService.setViewer(this.pdfViewer);

        document.addEventListener('pagesinit', () => {
          //设置缩放模式
          this.pdfViewer.currentScaleValue = this.scaleMode;
        });
      },
      // 加载文件
      loadFile() {
        this.fileLoading = true;
        const loadingTask = pdfjs.getDocument({
          url: this.fileUrl,
          cMapUrl: this.cmapUrl,
          cMapPacked: this.cmapPacked
        });
        loadingTask.promise.then((pdfDoc) => {
          this.renderPage(pdfDoc);
          this.fileLoading = false;
        }).catch(() => {
          this.$message.error('文件加载失败！');
          this.fileLoading = false;
        })
      },
      // 渲染页面
      renderPage(pdfDoc) {
        this.pdfViewer.setDocument(pdfDoc);
        this.pdfLinkService.setDocument(pdfDoc, null);
      },
      // 搜索
      handleSearch(searchText) {
        this.pdfFindController.executeCommand('find', { query: searchText });
      }
    },
  }
</script>

<style src="pdfjs-dist/web/pdf_viewer.css"></style>
<style lang="scss" scoped>
  .pdf-simple {
    height: 100%;

    .pdf-simple__container {
      min-height: 100%;
    }
  }
</style>
