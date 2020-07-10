<template>
  <div class="file-to-base64" ref="page">
    <div class="operation-wrap">
      <span>如果是特别大的文件，推荐使用谷歌或者火狐浏览器(火狐表现最好)，不然解析会比较慢，也有可能复制不上。</span>
      <div class="operation">
        <el-button type="primary" @click="handleClear">清除</el-button>
        <el-button type="primary" v-copy="text">复制</el-button>
      </div>
    </div>

    <div class="empty" v-if="!hasFile">任意文件<br />拖到这里</div>
    <div class="content" ref="content"></div>
  </div>
</template>

<script>
  export default {
    name: 'FileToBase64',
    data() {
      return {
        hasFile: false,
        text: ''
      }
    },
    mounted() {
      this.onDrop();
    },
    methods: {
      onDrop() {
        const page = this.$refs.page;
        page.addEventListener('dragenter', (event) => { event.preventDefault() });
        page.addEventListener('dragover', (event) => { event.preventDefault() });
        page.addEventListener('drop', (event) => {
          event.preventDefault();
          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target.result;
            this.$refs.content.insertAdjacentText('afterBegin', result);
            this.text = result;
            this.hasFile = true;
          };
          reader.readAsDataURL(event.dataTransfer.files[0]);
        });
      },
      handleClear() {
        this.$refs.content.innerText = '';
        this.text = '';
        this.hasFile = false;
      }
    },
  }
</script>

<style lang="scss" scoped>
  .file-to-base64 {
    box-sizing: border-box;
    min-height: 100%;
    padding: 1em;
    background-color: #fff;

    .operation-wrap {
      height: 50px;

      .operation {
        float: right;
      }
    }

    .empty {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 50px;
      font-family: Consolas, "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", Monaco, "Courier New", monospace;
      white-space: pre;
      text-align: center;
      color: gray;
    }

    .content {
      word-break: break-all;
      font-family: Consolas, "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", Monaco, "Courier New", monospace;
    }
  }
</style>
