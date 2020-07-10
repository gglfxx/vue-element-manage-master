<template>
  <div class="form-dynamic">
    <el-form ref="form" :model="form" label-position="top">
      <transition-group name="block" tag="div">
        <div class="block-item" v-for="(item,index) in form.workItem" :key="item.id">
          <div class="block-item__index">{{index + 1}}</div>

          <el-row>
            <el-col :span="12">
              <el-form-item :label="item.date.label">
                <el-date-picker
                  type="daterange"
                  v-model="item.date.value"
                  format="yyyy年MM月dd日"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  unlink-panels>
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="item.department.label">
                <el-input v-model="item.department.value"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item :label="item.title.label">
            <el-input v-model="item.title.value"></el-input>
          </el-form-item>

          <el-form-item :label="item.task.label">
            <el-input v-model="item.task.value"></el-input>
          </el-form-item>

          <i class="el-icon-remove block-item--remove" @click="handleRemove(index)"></i>
        </div>
      </transition-group>
    </el-form>

    <div class="block-item--add" @click="handleAdd">点击新增履历</div>
    <div style="text-align:center;">
      <el-button type="primary" round @click="handldeSubmit" :loading="submitLoading">提交</el-button>
    </div>
  </div>
</template>

<script>
  import { guid } from '@/utils/core';

  const workTemplate = {
    date: {
      label: '起止时间',
      value: []
    },
    department: {
      label: '所在单位',
      value: ''
    },
    title: {
      label: '职务职称',
      value: ''
    },
    task: {
      label: '主要工作',
      value: ''
    }
  }

  export default {
    name: 'DynamicForm',
    data() {
      return {
        form: {
          workItem: []
        },
        submitLoading: false,
      }
    },
    created() {
      this.initWorkItem(3);
    },
    methods: {
      initWorkItem(amount) {
        for (let i = amount; i--;) {
          this.handleAdd();
        }
      },
      handleAdd() {
        const template = Object.assign({}, workTemplate);
        template.id = guid();
        this.form.workItem.push(template);
      },
      handleRemove(index) {
        this.form.workItem.splice(index, 1)
      },
      handldeSubmit() {
        this.$message.success('提交成功！');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form-dynamic {
    box-sizing: border-box;
    width: 1000px;
    padding: 20px 100px;
    margin: 0 auto;
    border-radius: 10px;
    background-color: #fff;

    .block-item {
      position: relative;
      box-sizing: border-box;
      width: 800px;
      border-left: 1px solid #e6e6e6;
      border-right: 1px solid #e6e6e6;
      margin: 20px 0px;
      padding: 0px 10px;
      transition: all 1s;
    }

    .block-enter,
    .block-leave-to {
      opacity: 0;
      transform: translateY(30px);
    }

    .block-leave-active {
      position: absolute;
    }

    .block-item--remove {
      position: absolute;
      top: 50%;
      right: -61px;
      transform: translate(0, -11px);
      font-size: 28px;
      color: #d95d5d;
      cursor: pointer;
    }

    .block-item--add {
      margin: 0px -100px 20px -100px;
      height: 200px;
      line-height: 200px;
      text-align: center;
      background: url(~@/assets/images/form/add.jpg) no-repeat;
      background-size: cover;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
    }

    .block-item__index {
      position: absolute;
      left: -100px;
      top: 50%;
      transform: translate(0, -30px);
      width: 100px;
      height: 60px;
      font-size: 50px;
      font-weight: 500;
      background: linear-gradient(to bottom right, red, blue);
      color: transparent;
      -webkit-background-clip: text;
      text-align: center
    }
  }
</style>

<style>
  .form-dynamicm .el-form-item__label {
    line-height: 20px;
  }
</style>
