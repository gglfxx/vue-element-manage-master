<template>
  <div class="pdf-component">
    <pdf
      sourceType="url"
      url="http://www.xdocin.com/xdoc?_key=t7t7z6j54vezfdnwptijcmo63i&_func=down&_dir=math.pdf" />
  </div>
</template>

<script>
  import Pdf from '@/components/pdf';

  export default {
    name: 'PdfComponent',
    components: {
      Pdf
    },
    data() {
      return {

      }
    }
  }
</script>

<style lang="scss" scoped>
  .pdf-component {
    height: 100%;
  }
</style>
