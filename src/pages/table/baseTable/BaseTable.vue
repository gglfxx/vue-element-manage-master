<template>
  <el-table :data="tableData" border highlight-current-row>
    <el-table-column type="index" label="序号" width="80px"></el-table-column>
    <el-table-column prop="date" label="日期"></el-table-column>
    <el-table-column prop="name" label="姓名"></el-table-column>
    <el-table-column prop="age" label="年龄" sortable></el-table-column>
    <el-table-column
      prop="gender"
      label="性别"
      :filters="tableMng.formatTable('gender', 'value', 'text')"
      :filter-method="handleFilter">
      <template slot-scope="scope">
        <span>{{tableMng.getNameById('gender',scope.row.gender)}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="region"
      label="地区"
      :filters="tableMng.formatTable('region', 'value', 'text')"
      :filter-method="handleFilter">
      <template slot-scope="scope">
        <span>{{tableMng.getNameById('region',scope.row.region)}}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import Mock from 'mockjs';
  import tableMng from '@/utils/tableMng';

  const data = Mock.mock({
    'tableData|20': [{
      id: '@lower(@guid)',
      date: '@datetime("yyyy-MM-dd HH:mm:ss")',
      name: '@cname',
      age: '@natural(20,40)',
      region: '@pick(["1", "2","3","4","5"])',
      gender: '@pick(["1", "2"])',
    }],
  })

  export default {
    name: 'BaseTable',
    data() {
      return {
        tableMng,
        tableData: [],
      }
    },
    created() {
      this.tableData = data.tableData;
    },
    methods: {
      handleFilter(value, row, column) {
        const property = column.property;
        return row[property] == value;
      },
    }
  }
</script>
