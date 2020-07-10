<template>
  <!-- 设置系统风格。按钮,表单可以设置成方形或椭圆形 -->
  <el-radio-group v-model="style">
    <el-radio label="round">圆润</el-radio>
    <el-radio label="square">方正</el-radio>
  </el-radio-group>

</template>

<script>
  const styleContent = require('!css-loader!./style.css')[0][1];

  export default {
    data() {
      return {
        style: this.$store.getters.style,
      }
    },
    watch: {
      style(value) {
        this.triggerStyle(value);
        this.$store.commit('SET_STYLE', value);
      }
    },
    mounted() {
      this.triggerStyle(this.style);
    },
    methods: {
      triggerStyle(value) {
        const systemStyleElem = document.head.querySelector('#systemStyle');
        if (value === 'round') {
          if (systemStyleElem) return;
          const styleElem = document.createElement('style');
          styleElem.setAttribute('id', 'systemStyle');
          styleElem.appendChild(document.createTextNode(styleContent));
          document.head.appendChild(styleElem);
        } else if (value === 'square') {
          if (systemStyleElem) {
            document.head.removeChild(systemStyleElem);
          }
        }
      }
    },
  }
</script>
