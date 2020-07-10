<template>
  <div class="excel-upload">
    <input style="display:none" type="file" ref="fileInput" accept=".xlsx,.xls" @change="selectFile">
    <el-button type="info" round icon="el-icon-upload" :loading="loading" @click="handleUpload">点击选择文件</el-button>
    <span class="file-name" v-show="fileName">
      <i class="el-icon-document"></i>
      {{fileName}}
    </span>
  </div>
</template>

<script>
  import XLSX from 'xlsx';

  export default {
    props: {
      beforeUpload: Function,
      onSuccess: Function
    },
    data() {
      return {
        fileName: '',
        loading: false,
      }
    },
    methods: {
      handleUpload() {
        this.$refs.fileInput.click();
      },
      selectFile(event) {
        const files = event.target.files;
        const firstFile = files[0];
        if (!this.isExcel(firstFile)) {
          this.$message.error('上传的文件只能是xls或xlsx格式!');
          return false;
        }
        this.fileName = firstFile.name;
        if (!this.beforeUpload) {
          this.readData(firstFile);
        } else {
          const before = this.beforeUpload(firstFile);
          if (before) {
            this.readData(firstFile);
          }
        }
        this.$refs.fileInput.value = null; //将文件清掉，不然再次选择这个文件，change事件不会被触发。
      },
      readData(file) {
        this.loading = true;
        const fileReader = new FileReader();
        fileReader.onload = event => {
          const data = event.target.result;
          // 以二进制流方式读取得到整份excel表格对象
          const workbook = XLSX.read(data, {
            type: 'binary'
          });
          // 只读取第一个sheet中的数据
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const header = this.getHeaderRow(worksheet);
          const result = XLSX.utils.sheet_to_json(worksheet);
          this.onSuccess(header, result);
          this.loading = false;
        };
        fileReader.readAsBinaryString(file);
      },
      // 获取表头
      getHeaderRow(sheet) {
        const header = [];
        const range = XLSX.utils.decode_range(sheet['!ref']);
        const R = range.s.r;
        for (let C = range.s.c; C <= range.e.c; C++) {
          const cell = sheet[XLSX.utils.encode_cell({
            c: C,
            r: R
          })]
          let hdr = 'UNKNOWN' + (C + 1); //设置表头不存在时的默认值
          if (cell && cell.t) {
            hdr = XLSX.utils.format_cell(cell);
          }
          header.push(hdr);
        }
        return header;
      },
      isExcel(file) {
        return /\.(xls|xlsx)$/.test(file.name);
      }
    }
  }
</script>

<style scoped>
  .excel-upload {
    display: inline-block;
  }

  .file-name {
    margin: 0 1em;
    color: #4a4a4a;
  }
</style>
