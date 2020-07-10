<template>
  <el-tabs v-model="activeName" type="border-card" >
    <el-tab-pane label="导出Excel" name="exportExcel">
      <ExportExcel />
    </el-tab-pane>
    <el-tab-pane label="导入Excel" name="uploadExcel">
      <UploadExcel />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import ExportExcel from './components/ExportExcel';
  import UploadExcel from './components/UploadExcel';

  export default {
    name:'Excel',
    components: {
      ExportExcel,
      UploadExcel
    },
    data() {
      return {
        activeName: 'exportExcel'
      }
    }
  }
</script>
