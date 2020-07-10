<template>
  <div class="scrollbar-demo">
    <p>“size”属性设置滚动条粗细。</p>
    <p>“color”属性设置滚动条颜色。</p>
    <p>只存在水平滚动条的情况下，支持使用滚轮进行水平滚动。</p>
    <p>支持点击滚动条所在的轨道，滚动到对应位置。</p>
    <p>支持滚动条位置和长度跟随内容大小的改变而改变，比如浏览器窗口缩放导致的内容大小变化，列表展开/折叠导致的内容大小变化</p>
    <br>


    <h3>垂直滚动:</h3>
    <div class="section">
      <Scrollbar>
        <div>
          <p>在12月21日《环球时报》年会夜话一“预测2020年的世界”环节，与会学者围绕“中国是否变强硬”展开讨论。海军研究院研究员张军社表示，关于中国“强”了还是“硬”了，仁者见仁，智者见智。他认为，中国变强大了是产生这一争论的最根本原因。</p>
          <p v-for="item in 50" :key="item">{{item}}</p>
        </div>
      </Scrollbar>
    </div>

    <h3>水平滚动:</h3>
    <div class="section">
      <Scrollbar :size="10" color="#409eff">
        <div style="width:1200px;white-space:nowrap ">
          <p>在12月21日《环球时报》年会夜话一“预测2020年的世界”环节，与会学者围绕“中国是否变强硬”展开讨论。海军研究院研究员张军社表示，关于中国“强”了还是“硬”了，仁者见仁，智者见智。他认为，中国变强大了是产生这一争论的最根本原因。</p>
        </div>
      </Scrollbar>
    </div>

    <h3>垂直和水平滚动:</h3>
    <div class="section">
      <Scrollbar>
        <div style="width:1200px;white-space:nowrap ">
          <p>在12月21日《环球时报》年会夜话一“预测2020年的世界”环节，与会学者围绕“中国是否变强硬”展开讨论。海军研究院研究员张军社表示，关于中国“强”了还是“硬”了，仁者见仁，智者见智。他认为，中国变强大了是产生这一争论的最根本原因。</p>
          <p v-for="item in 100" :key="item">{{item}}</p>
        </div>
      </Scrollbar>
    </div>

    <h3>rezise:</h3>
    <div class="section rezise">
      <Scrollbar>
        <div style="width:500px;white-space:nowrap ">
          <p>在12月21日《环球时报》年会夜话一“预测2020年的世界”环节，与会学者围绕。</p>
          <p>调整浏览器窗口大小看看</p>
          <p v-for="item in 100" :key="item">{{item}}</p>
        </div>
      </Scrollbar>
    </div>

  </div>
</template>

<script>
  import Scrollbar from '@/components/scrollbar';

  export default {
    name: 'ScrollbarDemo',
    components: {
      Scrollbar
    },
  }
</script>

<style lang="scss" scoped>
  .scrollbar-demo {

    .section {
      margin: 20px;
      height: 200px;
      width: 300px;
      margin-bottom: 20px;
      border: 1px solid #d9d9d9;
      font-size: 12px;
    }

    .rezise {
      width: 50%;
    }
  }
</style>
