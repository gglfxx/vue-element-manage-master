<template>
  <div>
    <router-view />

    <theme-setting style="display: none" />
  </div>
</template>

<script>
  import api from '@/api';
  import tableMng from '@/utils/tableMng';
  import ThemeSetting from '@/components/setting/themeSetting';

  export default {
    components: {
      ThemeSetting,
    },
    created() {
      this.initBaseTable();
    },
    methods: {
      //  初始化基础数据表
      async initBaseTable() {
        const data = await api.common.getBaseTable();
        tableMng.initTable(data);
      }
    },
  }
</script>
