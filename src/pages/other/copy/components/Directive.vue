<template>
  <div class="copy-directive">
    <main>
      <h3>1.复制元素节点</h3>
      <div>
        <div class=" copy-directive__content red" ref="content" id="content">
          <p>我是红色的内容</p>
          <p>我是红色的内容</p>
          <p>我是红色的内容</p>
          <p>我是红色的内容</p>
          <p>我是红色的内容</p>
        </div>
      </div>
      <el-button type="primary" v-copy="content">点击复制红色内容</el-button>
    </main>

    <section>
      <h3>2.复制文本</h3>
      <div class="copy-directive__content">
        <el-input v-model="text" placeholder="请输入要复制的内容"></el-input>
      </div>
      <el-button type="primary" v-copy="text">点击复制输入框中的内容</el-button>
    </section>
  </div>

</template>

<script>
  import { copy } from '@/utils/core';
  export default {
    data() {
      return {
        content: null,
        text: '我input中的内容，我input中的内容，我input中的内容。'
      }
    },
    mounted() {
      this.content = this.$refs.content;
    },
  }
</script>

<style lang="scss" scoped>
  .content {
    border: 1px solid #d9d9d9;
    padding: 1em;
    text-indent: 2em;
    margin-bottom: 1em;
  }

  .copy-directive {
    section {
      margin-bottom: 1em;
    }

    .copy-directive__content {
      padding: 1em;
      text-align: center;
      border: 1px solid #d9d9d9;
      cursor: pointer;
      margin-bottom: 1em;
    }

    .red {
      color: #f56c6c
    }
  }
</style>
