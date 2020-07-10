<template>
  <div class="table-complex">
    <el-table
      class="table-complex__body"
      :data="tableData"
      border
      highlight-current-row
      v-loading="tableLoading"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50px"></el-table-column>
      <el-table-column prop="index" label="序号" width="80px"></el-table-column>
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

      <el-table-column prop="roles" label="角色">
        <template slot-scope="scope">
          <span v-for="(role , index) in scope.row.roles" :key="role">
            {{tableMng.getNameById('role',role)}}
            <span v-if="scope.row.roles.length !== index + 1">,</span>
          </span>
        </template>
      </el-table-column>

      <el-table-column prop="registerDate" label="注册时间" sortable></el-table-column>
      <el-table-column prop="consume" label="累计消费额(元)" sortable></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      position="center"
      :total="total"
      :page-number.sync="queryCondition.pageNumber"
      :page-size.sync="queryCondition.pageSize"
      @pagination="getTableData" />
  </div>
</template>

<script>
  import Pagination from '@/components/pagination';
  import { scroll } from '@/utils/core';
  import api from '@/api';
  import tableMng from '@/utils/tableMng';

  export default {
    name: 'ComplexTable',
    components: {
      Pagination
    },
    data() {
      return {
        tableMng,
        tableData: [],
        tableLoading: false,
        queryCondition: {
          name: '',
          pageNumber: 1,
          pageSize: 20
        },
        total: 0,
        multipleSelection: []
      }
    },
    created() {
      this.getTableData();
    },
    methods: {
      async getTableData() {
        this.tableLoading = true;
        const data = await api.user.getList(this.queryCondition);
        this.tableData = data.list.map((item, index) => ({
          id: item.id,
          index: (this.queryCondition.pageNumber - 1) * this.queryCondition.pageSize +
            index + 1,
          name: item.name,
          age: item.age,
          gender: item.gender,
          roles: item.roles,
          registerDate: item.registerDate,
          consume: item.consume
        }))
        this.total = data.total;
        this.tableLoading = false;
        const scrollElement = document.querySelector('.inner-layout__page');
        scroll(scrollElement, 0, 800);
      },
      handleFilter(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      handleEdit() {

      },
      handleDelete(index, row) {
        this.$confirm(`确认删除用户“${row.name}”？`, "提示", {
          type: 'warning',
        }).then(() => {
          this.getTableData();
          this.$message.success("删除成功！");
        }).catch(() => {

        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .table-complex {
    padding: 1em;
    background-color: #fff;

    .table-complex__body {
      margin-bottom: 20px;
    }
  }
</style>
