<template>
  <el-upload
    class="form-step__uploader"
    action="https://jsonplaceholder.typicode.com/posts/"
    :show-file-list="false"
    :on-success="handleUploadSuccess"
    :before-upload="beforeUpload">
    <i class="icon" :class="uploading ? 'el-icon-loading' : 'el-icon-plus' "></i>
    <p class="name active" v-if="fileName" :title="fileName">{{fileName}}</p>
    <p class="name" v-else>{{name}}</p>
  </el-upload>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        default: ''
      },
      // 用来判断使用的是哪个上传控件
      type: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        uploading: false,
        fileName: '',
      }
    },
    methods: {
      handleUploadSuccess(res, file) {
        this.uploading = false;
        const fileId = res.id;
        const fileName = file.raw.name
        this.fileName = fileName;
        this.$emit('onUploadSuccess', {
          id: fileId,
          type: this.type,
          name: fileName
        })
      },
      beforeUpload(file) {
        this.uploading = true;
        return true;
      },
      // 文件上传一般不会直接使用action来指定上传地址，而是统一使用axios
      // 这时action可以随便填个字符串(action是必填参数，不能为空)
      // beforeUpload(file) {
      //   const formData = new FormData();
      //   formData.append("portrait", file);
      //   formData.append("userId", "1234565");
      //   api.common.upload(formData).then(res => {

      //   })
      //   return false; //返回false是为了阻止默认的的上传
      // }
    }
  }
</script>

<style lang="scss">
  .form-step__uploader {
    .el-upload {
      box-sizing: border-box;
      width: 100px;
      height: 100px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      padding-top: 30px;

      &:hover {
        border-color: var(--theme);
      }

      .icon {
        font-size: 24px;
        color: $secondary-text-color;
      }

      .name {
        @include text-ellipsis-single;
        margin-top: 10px;
        font-size: 12px;

        &.active {
          color: #67c23a;
        }
      }
    }
  }
</style>
