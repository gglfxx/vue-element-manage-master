<template>
  <div>
    <upload-excel
      :before-upload="beforeUpload"
      :on-success="handleSuccess" />
    <el-table :data="tableData" border highlight-current-row>
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>
  </div>
</template>

<script>
  import UploadExcel from '@/components/excel/uploadExcel';

  export default {
    components: {
      UploadExcel
    },
    data() {
      return {
        tableData: [],
        tableHeader: []
      }
    },
    methods: {
      beforeUpload(file) {
        const isLt20M = file.size / 1024 / 1024 < 20;
        if (!isLt20M) {
          this.$message.error('上传的文件大小不能超过 20MB!');
        }
        return isLt2M;
      },
      handleSuccess(header, result) {
        this.tableHeader = header;
        this.tableData = result;
        this.$message.success('上传成功！');
      }
    }
  }
</script>

<style scoped>
  .el-table {
    margin-top: 20px;
  }
</style>
