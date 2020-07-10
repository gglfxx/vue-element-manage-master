<template>

  <iframe
    :src="`${urlPrefix}${encodeURIComponent(fileURL)}`"
    :width="typeof width ==='number' ? width + 'px' : width"
    :height="typeof height ==='number' ? height + 'px' : height"
    frameborder="0" />

</template>

<script>
  export default {
    props: {
      mode: {
        type: String,
        default: 'preview'
      },
      fileURL: {
        type: String,
        required: true
      },
      width: {
        default: '100%'
      },
      height: {
        default: '100%'
      }
    },
    computed: {
      urlPrefix() {
        return this.mode === 'preview' ?
          // 'https://view.officeapps.live.com/op/view.aspx?src=' :
          'http://officeonline.hbncp.com.cn/op/view.aspx?src=' :
          'http://officeonline.hbncp.com.cn/we/wordeditorframe.aspx?wopisrc=';
      }
    },
  }
</script>
