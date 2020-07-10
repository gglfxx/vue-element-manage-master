<template>
  <div class="drag-dialog">
    <el-button type="primary" @click="dialogVisible = true">点击打开弹窗</el-button>
    <el-dialog v-drag-dialog title="拖拽" :visible.sync="dialogVisible" width="35%">
      <div>这是一段信息</div>
      <div>这是一段信息</div>
      <div>这是一段信息</div>
      <div>这是一段信息</div>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'DragDialog',
    data() {
      return {
        dialogVisible: false,
      };
    },
  };
</script>
