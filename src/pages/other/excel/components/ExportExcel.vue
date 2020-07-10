<template>
  <div>
    <export-excel
      file-name="数据表"
      :header="['姓名', '年龄', '性别', '电话', '电子邮箱', '毕业时间', '婚否']"
      :filter-filed="['name', 'age', 'gender', 'mobilePhone', 'email', 'graduationDate', 'isMarry']"
      :data="tableData">
      导出excel
    </export-excel>

    <el-table border highlight-current-row :data="tableData">
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="gender" label="性别"> </el-table-column>
      <el-table-column prop="mobilePhone" label="手机号"> </el-table-column>
      <el-table-column prop="email" label="电子邮箱"> </el-table-column>
      <el-table-column prop="graduationDate" label="毕业时间"> </el-table-column>
      <el-table-column prop="isMarry" label="婚否"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import ExportExcel from '@/components/excel/exportExcel';

  export default {
    components: {
      ExportExcel
    },
    data() {
      return {
        tableData,
      }
    },
  }

  const tableData = [{
    name: '张三',
    age: 21,
    gender: '男',
    mobilePhone: '15999999991',
    email: '',
    graduationDate: '2005/07/01',
    isMarry: '否'
  }, {
    name: '赵六',
    age: 20,
    gender: '男',
    mobilePhone: '',
    email: '1235@qq.com',
    graduationDate: '2011/08/10',
    isMarry: '是'
  }, {
    name: '李四',
    age: 30,
    gender: '',
    mobilePhone: '15999999939',
    email: '1236@qq.com',
    graduationDate: '1997/06/05',
    isMarry: '否'
  }, {
    name: '王五',
    age: 28,
    gender: '男',
    mobilePhone: '15999999996',
    email: '12387777777777777777777777@qq.com',
    graduationDate: '1998/06/05',
    isMarry: '是'
  }]
</script>

<style scoped>
  .el-table {
    margin-top: 20px;
  }
</style>
