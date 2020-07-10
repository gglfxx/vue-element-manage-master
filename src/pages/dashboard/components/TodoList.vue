<template>
  <el-card class="dashboard-todolist">
    <div slot="header">
      <span class="dashboard-todolist__header">待办事项</span>
      <el-button type="text" class="button--add" @click="handleAdd">添加</el-button>
    </div>

    <el-table :data="taskData" height="400">
      <el-table-column width="50">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.isCompleted"></el-checkbox>
        </template>
      </el-table-column>

      <el-table-column>
        <template slot-scope="scope">
          <span :class="{delete:scope.row.isCompleted}">{{scope.row.content}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="handleDelete(scope.$index)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
  </el-card>
</template>

<script>
  import api from '@/api';

  export default {
    data() {
      return {
        taskData: []
      }
    },
    created() {
      this.getTask();
    },
    methods: {
      async getTask() {
        const data = await api.dashboard.getTodoListData();
        this.taskData = data;
      },
      handleAdd() {
        this.$prompt('添加新的待办事项:', '', {
          inputPlaceholder: '请输入待办事项',
          inputValidator(value) {
            if (!value) {
              return '内容不能为空！'
            }
          },
        }).then(res => {
          this.taskData.unshift({
            isCompleted: false,
            content: res.value
          })
        }).catch(() => {})
      },
      handleEdit(index, row) {
        this.$prompt('修改待办事项', '', {
          inputValue: row.content,
          inputPlaceholder: '请输入待办事项',
          inputValidator(value) {
            if (!value) {
              return '内容不能为空！'
            }
          },
        }).then(res => {
          this.taskData[index].content = res.value;
        }).catch(() => {})
      },
      handleDelete(index) {
        this.taskData.splice(index, 1);
      }
    }
  }
</script>
<style lang="scss" scoped>
  .dashboard-todolist {
    .dashboard-todolist__header {
      font-size: 16px;
    }

    .button--add {
      float: right;
      padding: 3px 0;
    }

    .delete {
      text-decoration: line-through;
      color: rgba(0, 0, 0, .4);
    }
  }
</style>

<style lang="scss">
  .dashboard-todolist {
    .el-card__body {
      padding-top: 0px;
    }

    .el-table__header-wrapper {
      display: none;
    }
  }
</style>
