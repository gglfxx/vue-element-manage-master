<template>
  <div class="copy-comp">
    <section>
      <div class="content" ref="content">
        <h3>要复制的内容</h3>
        <p style="background-color:yellow">第一行内容111</p>
        <img src="https://picsum.photos/200/200/?random" alt="">
        <p>第二行内容222</p>
        <p>第三行内容333</p>
      </div>
      <copy :content="content" />
    </section>

    <br>

    <section>
      <p>{{text}}</p>
      <copy :content="text" />
    </section>
  </div>
</template>

<script>
  import Copy from '@/components/Copy';

  export default {
    components: {
      Copy
    },
    data() {
      return {
        text: '我是文本我是文本我是文本我是文本我是文本我是文本',
        content: null
      }
    },
    mounted() {
      this.content = this.$refs.content
    },
  }
</script>


<style lang="scss" scoped>
  .copy-comp {
    .content {
      border: 1px solid #d9d9d9;
      padding: 1em;
      text-indent: 2em;
      margin-bottom: 1em;
    }
  }
</style>
