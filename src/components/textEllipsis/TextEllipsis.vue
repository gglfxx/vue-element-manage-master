<template>
  <div class="text-ellipsis">

    <!-- <el-tooltip
      popper-class="text-ellipsis__tooltip"
      :content="text"
      effect="light"
      :disabled="tooltipDisabled"> -->

    <div v-if="limit > 0">
      {{content}}
    </div>

    <div
      :class="ellipsisClass"
      :style="ellipsisStyle"
      ref="lineLimit"
      v-else>
      {{text}}
    </div>
    <!-- </el-tooltip> -->

  </div>

</template>

<script>
  export default {
    props: {
      // 文本内容
      text: {
        type: String,
        default: ''
      },
      // 文字个数限制
      limit: {
        type: Number,
        default: 0
      },
      // 内容宽度限制
      width: {
        type: Number,
        default: 0
      },
      // 内容行数限制
      lineClamp: {
        type: Number,
        default: 0
      },
      // 是否显示tooltip
      showTooltip: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      content() {
        const { text, limit } = this;
        if (text.length <= limit) {
          return text;
        } else {
          return text.slice(0, limit) + '...';
        }
      },
      ellipsisClass() {
        return this.lineClamp > 0 ? 'text-ellipsis__multiple' : 'text-ellipsis__single';
      },
      ellipsisStyle() {
        return {
          width: this.width > 0 ? this.width + 'px' : '100%',
          '-webkit-line-clamp': this.lineClamp
        }
      },
      tooltipDisabled() {
        const textLengthOver = text.length > limit;

        return textLengthOver
      }
    }
  }
</script>

<style lang="scss" scoped>
  .text-ellipsis {

    //多行文本文字超过行数限制后显示省略号
    .text-ellipsis__multiple {
      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -moz-box;
      display: -webkit-box;
      display: -ms-flexbox;
      -webkit-box-orient: vertical;
      -moz-box-orient: vertical;
    }

    // 单行文本超出显示省略号
    .text-ellipsis__single {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }


  }
</style>
<style>
  .text-ellipsis__tooltip {
    max-width: 250px;
  }
</style>
