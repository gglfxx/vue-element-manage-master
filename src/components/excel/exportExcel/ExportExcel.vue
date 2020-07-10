<template>
  <!--导出excel表格 -->
  <el-button
    type="info"
    icon="el-icon-download"
    :loading="loading"
    @click="handleExport">
    <slot></slot>
  </el-button>
</template>

<script>
  import XLSX from 'xlsx';

  export default {
    props: {
      fileName: {
        type: String,
        default: ''
      },
      header: {
        required: true,
        type: Array,
      },
      filterFiled: {
        required: true,
        type: Array,
      },
      data: {
        type: Array,
        default: []
      },
      autoWidth: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        loading: false,
      }
    },
    methods: {
      handleExport() {
        this.loading = true;
        const header = this.header;
        let sheet;
        // 自动设置表格宽度所需要的数据格式与不设置宽度不一样。
        if (this.autoWidth) {
          const data = this.data.map(item => this.filterFiled.map(j => item[j]))
          data.unshift(header);
          sheet = this.sheet_from_array_of_arrays(data);
          this.adaptWidth(data, sheet);
        } else {
          const data = this.data.map(item => {
            const values = this.filterFiled.map(j => item[j]);
            const newItem = {};
            header.forEach((item, index) => {
              newItem[header[index]] = values[index];
            })
            return newItem;
          })
          sheet = XLSX.utils.json_to_sheet(data);
        }

        const sheetName = 'Sheet1';
        const wb = {
          SheetNames: [],
          Sheets: {},
          Props: {}
        };
        wb.SheetNames.push(sheetName);
        wb.Sheets[sheetName] = sheet;
        const wbout = XLSX.write(wb, {
          bookType: 'xlsx',
          bookSST: false,
          type: 'binary'
        });
        if (window.btoa) {
          this.downloadURI(wbout, this.fileName)
        } else {
          this.downloadBlob(wbout, this.fileName);
        }
        this.loading = false;
      },
      sheet_from_array_of_arrays(data) {
        const sheet = {};
        const range = {
          s: {
            c: 10000000,
            r: 10000000
          },
          e: {
            c: 0,
            r: 0
          }
        };
        for (let R = 0; R != data.length; ++R) {
          for (let C = 0; C != data[R].length; ++C) {
            if (range.s.r > R) range.s.r = R;
            if (range.s.c > C) range.s.c = C;
            if (range.e.r < R) range.e.r = R;
            if (range.e.c < C) range.e.c = C;
            const cell = {
              v: data[R][C]
            };
            if (cell.v == null) continue;
            const cell_ref = XLSX.utils.encode_cell({
              c: C,
              r: R
            });
            if (typeof cell.v === 'number') {
              cell.t = 'n';
            } else if (typeof cell.v === 'boolean') {
              cell.t = 'b';
            } else if (cell.v instanceof Date) {
              cell.t = 'n';
              cell.z = XLSX.SSF._table[14];
              cell.v = this.datenum(cell.v);
            } else {
              cell.t = 's';
            }
            sheet[cell_ref] = cell;
          }
        }
        if (range.s.c < 10000000) {
          sheet['!ref'] = XLSX.utils.encode_range(range);
        }
        return sheet;
      },
      datenum(v, date1904) {
        if (date1904) {
          v += 1462;
        };
        const epoch = Date.parse(v);
        return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
      },
      adaptWidth(data, sheet) {
        /*设置worksheet每列的最大宽度*/
        const colWidth = data.map(row => row.map(val => {
          /*先判断是否为null/undefined*/
          if (val == null) {
            return {
              'wch': 10
            };
          }
          /*再判断是否为中文*/
          else if (val.toString().charCodeAt(0) > 255) {
            return {
              'wch': val.toString().length * 2
            };
          } else {
            return {
              'wch': val.toString().length
            };
          }
        }))
        /*以第一行为初始值*/
        const result = colWidth[0];
        for (let i = 1; i < colWidth.length; i++) {
          for (let j = 0; j < colWidth[i].length; j++) {
            if (result[j]['wch'] < colWidth[i][j]['wch']) {
              result[j]['wch'] = colWidth[i][j]['wch'];
            }
          }
        }
        sheet['!cols'] = result;
      },
      //二进制字符串转字节流
      s2ab(s) {
        const buffer = new ArrayBuffer(s.length);
        const view = new Uint8Array(buffer);
        for (let i = 0; i < s.length; i++) {
          view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buffer;
      },
      // 使用blob对象下载文件
      downloadBlob(binaryString, name) {
        const stream = this.s2ab(binaryString);
        const blob = new Blob([stream], { type: 'application/octet-stream' });
        const link = document.createElement('a');
        const fileName = name || '数据';
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName + '.xlsx';
        link.click();
        // 延时释放
        setTimeout(function() {
          window.URL.revokeObjectURL(link.href);
        }, 100);
      },
      // 使用base64下载文件
      downloadURI(binaryString, name) {
        const header = 'data:application/octet-stream;base64,';
        const dataURI = window.btoa(binaryString);
        const link = document.createElement('a');
        const fileName = name || '数据';
        link.href = header + dataURI;
        link.download = fileName + '.xlsx';
        link.click();
      }
    }
  }
</script>
