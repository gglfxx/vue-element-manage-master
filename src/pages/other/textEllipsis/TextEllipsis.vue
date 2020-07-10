<template>
  <div>
    <h3>1.文本长度限制</h3>
    <TextEllipsis :text="text1" :limit="30" />
    <br />

    <h3>2.文本宽度限制</h3>
    <TextEllipsis :text="text2" :width="500" />
    <br />

    <div style="width:400px">
      <TextEllipsis :text="text3" />
    </div>

    <br />

    <h3>3.文本行数限制</h3>
    <TextEllipsis :text="text4" :width="300" :line-clamp="3" />
    <br />
  </div>


</template>

<script>
  import TextEllipsis from '@/components/textEllipsis';

  export default {
    name: 'TextEllipsisDemo',
    components: {
      TextEllipsis
    },
    data() {
      return {
        text1: '超出30个字显示省略号超出30个字显示省略号超出30个字显示省略号超出30个字显示省略号超出30个字显示省略号',
        text2: '超出500px显示省略号超出500px显示省略号超出500px显示省略号超出500px显示省略号',
        text3: '宽度由父元素决定宽度由父元素决定宽度由父元素决定宽度由父元素决定',
        text4: '超出三行显示省略号超出三行显示省略号超出三行显示省略号超出三行显示省略号超出三行显示省略号超出三行显示省略号超出三行显示省略号超出三行显示省略号超出三行显示省略号超出三行显示省略号超出三行显示省略号超出三行显示省略号超出三行显示省略号'
      }
    }
  }
</script>
