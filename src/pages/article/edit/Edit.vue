<template>
  <div class="article-edit">

    <div class="article-edit__header">
      <div class="title">
        <section-title :name="articleId ? '编辑文章' : '新增文章'" />
      </div>
      <div class="operation">
        <el-button type="primary" icon="el-icon-s-promotion" :loading="submitLoading" @click="handleSubmit">发布</el-button>
        <el-button type="info" icon="el-icon-circle-close" @click="handleClose">取消</el-button>
      </div>
    </div>


    <el-row>
      <el-col :lg="16">
        <!-- 一个组件上的v-model默认会利用名为value的prop和名为input的事件。 -->
        <tinymce
          v-model="articleDetail.content"
          :height="660" />
      </el-col>

      <el-col :lg="8">
        <el-form class="article-edit__form" ref="form" :model="articleDetail" :rules="formRules" label-width="90px">
          <el-form-item label="文章标题:" prop="name">
            <el-input v-model="articleDetail.name" placeholder="请输入文章标题" clearable></el-input>
          </el-form-item>

          <el-form-item label="文章类型:" prop="type">
            <el-select v-model="articleDetail.type" placeholder="请选择文章类型" clearable>
              <el-option v-for="item in tableMng.getTable('article')" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="文章简介:">
            <el-input v-model="articleDetail.brief" type="textarea" :rows="3" :maxlength="100" placeholder="请输入文章简介" clearable></el-input>
          </el-form-item>

          <el-form-item label="创建时间:" prop="createDate">
            <el-input v-model="articleDetail.createDate" disabled></el-input>
          </el-form-item>

          <el-form-item label="标题图片:" prop="imageURL">
            <avatar-upload
              v-model="articleDetail.imageURL"
              action="https://sm.ms/api/v2/upload"
              name="smfile"
              :round="false"
              width="80px" />
          </el-form-item>

          <el-form-item label="附件上传:">
            <drag-upload
              v-model="articleDetail.accessory"
              action="https://jsonplaceholder.typicode.com/posts" />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import api from '@/api';
  import bus from '@/utils/bus';
  import tableMng from '@/utils/tableMng';
  import AvatarUpload from '@/components/upload/avatarUpload';
  import DragUpload from '@/components/upload/dragUpload';
  import SectionTitle from '@/components/sectionTitle';
  import Tinymce from '@/components/tinymce';
  import dayjs from 'dayjs';

  const defaultDetail = {
    id: '',
    name: '',
    type: '',
    content: '',
    createDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    imageURL: '',
    brief: '',
    accessory: []
  }

  export default {
    name: 'ArticleEdit',
    props: ['articleId'],
    components: {
      AvatarUpload,
      DragUpload,
      SectionTitle,
      Tinymce
    },
    data() {
      return {
        tableMng,
        articleDetail: { ...defaultDetail },
        formRules: {
          name: [{
            required: true,
            message: '请填写文章标题',
            trigger: 'blur'
          }, {
            max: 20,
            message: '标题不能超过20个字',
            trigger: 'blur'
          }],
          type: [{
            required: true,
            message: '请选择文章类型',
            trigger: 'change'
          }],
          imageURL: [{
            required: true,
            message: '请上传标题图片',
          }]
        },
        submitLoading: false,
      }
    },
    created() {
      this.getDetail();
    },
    methods: {
      async getDetail() {
        if (this.articleId) {
          const data = await api.article.getDetail({ id: this.articleId });
          this.articleDetail = {
            id: data.id,
            name: data.name,
            createDate: this.$dayjs(data.createDate).format('YYYY-MM-DD HH:mm:ss'),
            imageURL: data.imageURL,
            type: data.type,
            brief: data.brief,
            content: data.content,
            accessory: data.accessory
          };
        } else {
          this.articleDetail = { ...defaultDetail };
        }
      },
      handleSubmit() {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            this.submitLoading = true;
            await api.article.update({ detail: this.articleDetail });
            this.submitLoading = false;
            this.$message.success('发布成功');
            this.handleClose();
          } else {
            this.$message.error('请按照正确格式填写');
          }
        })
      },
      handleClose() {
        bus.$emit('closeTag', this.$route.path);
        this.$router.push('/article/list');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .article-edit {
    background-color: #fff;
    padding: 1em;

    .article-edit__header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;

      .title,
      .operation {
        margin-bottom: 1em;
      }
    }

    .article-edit__form {
      box-sizing: border-box;
      height: 660px;
      overflow-y: auto;
      padding: 1em;
      border: 1px solid #c5c5c5;
    }
  }
</style>
