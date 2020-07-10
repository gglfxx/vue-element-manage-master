<template>
  <el-table :data="tableData" border v-loading="tabLoading">
    <el-table-column prop="name" label="姓名" width="180px"> </el-table-column>
    <el-table-column prop="age" label="年龄" width="180px"></el-table-column>
    <el-table-column prop="gender" label="性别"></el-table-column>
    <el-table-column prop="email" label="邮箱"></el-table-column>
    <el-table-column prop="mobilePhone" label="手机"></el-table-column>
  </el-table>
</template>

<script>
  import api from '@/api';

  export default {
    props: {
      name: {
        required: true,
        type: String,
      }
    },
    data() {
      return {
        tableData: [],
        tabLoading: false
      }
    },
    created() {
      this.getList();
    },
    methods: {
      async getList() {
        this.tabLoading = true;
        const data = await api.tab.getList({ name: this.name });
        this.tableData = data;
        this.tabLoading = false;
      }
    }
  }
</script>
