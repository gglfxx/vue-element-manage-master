<template>
  <div class="menu-item">
    <el-submenu v-if="config.children" :index="config.path">
      <template slot="title">
        <svg-icon v-if="config.icon" :icon-name="config.icon" icon-class="menu-icon" />
        <span>{{config.title}}</span>
      </template>
      <menu-item v-for="childConfig in config.children" :key="childConfig.path" :config="childConfig" />
    </el-submenu>

    <el-menu-item v-else :index="config.path">
      <svg-icon v-if="config.icon" :icon-name="config.icon" icon-class="menu-icon" />
      <span slot="title">{{config.title}}</span>
    </el-menu-item>
  </div>
</template>

<script>
  export default {
    name: 'MenuItem',
    props: {
      config: {
        required: true,
        default: {}
      },
    }
  }
</script>

<style lang="scss" scoped>
  .menu-item {
    .menu-icon {
      vertical-align: middle;
      font-size: 18px;
    }
  }
</style>

<style lang="scss">
  .el-menu--collapse {
    .menu-item {
      .el-submenu>.el-submenu__title {

        span,
        .el-submenu__icon-arrow {
          display: none;
        }
      }
    }
  }
</style>
