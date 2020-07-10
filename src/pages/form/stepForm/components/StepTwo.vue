<template>
  <div class="form-steptwo">
    <ul class="upload-list">
      <li v-for="item in uploadList" :key="item.type">
        <upload :name="item.name" :type="item.type" @onUploadSuccess="handleUploadSuccess" />
      </li>
    </ul>

    <div class="button">
      <el-button type="primary" @click="handlePrevStep">上一步</el-button>
      <el-button type="primary" @click="handleNextStep">下一步</el-button>
    </div>
  </div>

</template>

<script>
  import Upload from './Upload';
  export default {
    components: {
      Upload
    },
    data() {
      return {
        uploadList: [{
          type: 'entrust',
          name: '授权委托书'
        }, {
          type: 'license',
          name: '营业执照副本'
        }, {
          type: 'collect',
          name: '数据采集表'
        }],
        fileList: []
      }
    },
    methods: {
      handleUploadSuccess(data) {
        const fileIndex = this.fileList.findIndex(item => item.type === data.type);
        if (fileIndex !== -1) {
          this.fileList.splice(fileIndex, 1);
        }
        this.fileList.push(data)
      },
      validForm() {
        let result = true;
        if (this.uploadList.length !== this.fileList.length) {
          result = false;
        }
        return result;
      },
      handleNextStep() {
        this.$emit('onNextStep', this.validForm())
      },
      handlePrevStep() {
        this.$emit('onPrevStep')
      }
    },
  }
</script>

<style lang="scss" scoped>
  .form-steptwo {
    .upload-list {
      display: flex;
      justify-content: center;

      li {
        margin: 0 10px;
      }
    }

    .button {
      margin-top: 20px;
      text-align: center;
    }
  }
</style>
