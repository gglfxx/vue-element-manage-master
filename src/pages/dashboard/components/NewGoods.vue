<template>
  <el-card class="goods-card">
    <div slot="header">
      <span class="goods-card__header">今日新上架商品</span>
    </div>
    <el-table :data="newGoodsData" height="400">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="address" label="产地" width="160"></el-table-column>
      <el-table-column prop="price" label="价格(元)" width="100"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  export default {
    data() {
      return {
        newGoodsData: [{
          name: "商品一",
          address: "产地一产地一产地一产地一产地一",
          price: "500"
        }, {
          name: "商品二",
          address: "产地一",
          price: "50000"
        }, {
          name: "商品三",
          address: "产地一",
          price: "500"
        }, {
          name: "商品四",
          address: "产地一",
          price: "500"
        }, {
          name: "商品五",
          address: "产地一",
          price: "500"
        }, {
          name: "商品六",
          address: "产地一",
          price: "500"
        }, ]
      }
    }
  }
</script>
<style lang="scss" scoped>
  .goods-card {
    .goods-card__header {
      font-size: 16px;
    }
  }
</style>
<style lang="scss">
  .goods-card {
    .el-card__body {
      padding-top: 0px;
    }

  }
</style>
