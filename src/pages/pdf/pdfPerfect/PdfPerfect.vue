<template>
  <div class="pdf-prefect">
    <iframe
      frameborder="0"
      width="100%"
      height="100%"
      src="./static/pdf/base64/web/viewer.html">
    </iframe>
  </div>
</template>

<script>
  export default {
    name: 'PdfPerfect',
  }
</script>

<style>
  .pdf-prefect {
    height: 100%;
  }
</style>
