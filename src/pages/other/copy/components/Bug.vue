<template>
  <main>
    <p>使用的时候发现在一定条件下会把触发复制的按钮也复制下来。这种情况需要满足以下条件：</p>
    <p>1.复制按钮紧挨着要复制的内容</p>
    <p>2.复制按钮后边也紧挨着一个相邻兄弟元素</p>
    <p>3.复制按钮带有.el-button样式</p>

    <br>

    <div class="copy-bug" ref="content">
      <p>我是要复制的内容，紧挨着我的按钮也会被复制</p>
      <p>我是要复制的内容，紧挨着我的按钮也会被复制</p>
    </div>
    <el-button type="primary" @click="handleCopy">点我复制</el-button>
    <p>我是紧挨着复制按钮的相邻兄弟元素</p>

    <br>
    <p>复制的时候会创建一个range对象，输出这个range对象，发现startContainer和endContaniner是要复制的元素的父元素。这样是不是可以简单理解为复制按钮也包含在这两个边界点中</p>


    <br>


    <p>
      解决方法1.
      <span>复制时创建一个div，将要复制的内容包裹起来</span>
    </p>
    <p>
      解决方法2.
      <span>将复制使用的selectNode()方法更换为selectNodeContents()</span>
    </p>


  </main>

</template>

<script>
  export default {
    data() {
      return {
        content: null
      }
    },
    mounted() {
      this.content = this.$refs.content
    },
    methods: {
      handleCopy() {
        const copyNode = (elem) => {
          const selection = window.getSelection();
          if (selection.rangeCount > 0) selection.removeAllRanges();
          const range = document.createRange();
          range.selectNode(elem);
          // range.selectNodeContents(elem);
          selection.addRange(range);
          console.log(range);
          document.execCommand('Copy');
          range.collapse(false);
          this.$message.success('复制成功');
        }

        if (!this.content) {
          this.$message.warning('没有要复制的内容');
        } else if (this.content.nodeType === 1) {
          copyNode(this.content);
        } else if (typeof this.content === 'string') {
          const wrap = document.createElement('p');
          wrap.innerText = this.content;
          document.body.appendChild(wrap);
          copyNode(wrap);
          document.body.removeChild(wrap);
        } else {
          this.$message.warning('没有可以复制的内容');
        }
      }
    },
  }
</script>

<style scoped>
  .copy-bug {
    padding: 1em;
    border: 1px solid #d9d9d9;
  }
</style>
