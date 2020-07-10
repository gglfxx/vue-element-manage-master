<template>
  <div>
    <div id="print">
      <div class="print" style="font-size: 18px;text-indent: 2em;color: brown;">要打印的内容要打印的内容要打印的内容要打印的内容要打印的内容要打印的内容要打印的内容要打印的内容要打印的内容要打印的内容...</div>
    </div>
    <br>

    <h3>1.替换body内容的方式</h3>
    <el-button type="primary" @click="print1('print')">替换body内容</el-button>
    <p>#这种方式在打印之后回到页面，<strong>页面中的一切操作都会失效</strong> 。比如点击打印按钮，打印完成后后，打印按钮就会失效。可以在打印完成后执行location.reload方法来刷新一遍页面。</p>
    <p>#如果打印内容的样式是继承而来的将会无效，比如父元素设置了文字颜色，打印时这个CSS属性不会生效。</p>
    <br>

    <h3>2.动态创建iframe</h3>
    <p>使用这两种方式<strong>需要将要打印的内容的样式编写为内联样式</strong> 。</p>
    <el-button type="primary" @click="print2">动态创建iframe</el-button>
    <p></p><br>

    <h3>3.在新窗口中进行打印</h3>
    <el-button type="primary" @click="print3">新窗口打印</el-button>
    <p></p><br>

    <h3>4.隐藏body子元素的方式</h3>
    <el-button type="primary" @click="print4">隐藏body子元素</el-button>
    <p></p><br>

    <h3>5.iframe中引入要打印的页面</h3>
    <iframe id="printFrame" style="display: none" src=""></iframe>
    <el-button type="primary" @click="print5">静态iframe</el-button>
    <p>#需要将要打印的页面放在static文件夹中</p>
    <br>

    <div>综合以上，个人认为方法4最优。实际开发可根据具体业务需求选择。</div>

  </div>
</template>
<script>
  export default {
    name: 'Print',
    methods: {
      print1(id) {
        const body = document.body.innerHTML;
        const printContent = document.getElementById('print').innerHTML;
        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = body;
        location.reload();
      },
      print2() {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('style', 'overflow:hidden;width:0px;height:0px; ');
        document.body.appendChild(iframe);

        const doc = iframe.contentWindow.document;
        const printContent = document.getElementById('print').innerHTML;
        doc.write(printContent);
        doc.close();

        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        document.body.removeChild(iframe);
      },
      print3() {
        const printContent = document.getElementById('print').innerHTML;
        const wind = window.open(
          '',
          'printwindow',
          'height=300, width=700, top=100, left=100, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no'
        );
        wind.document.body.innerHTML = printContent;
        wind.print();
      },
      print4() {
        const printNode = document.getElementById('print');
        const print = printNode.cloneNode(true);
        const childs = Array.from(document.body.children).filter(child => child.nodeName != 'SCRIPT');
        for (let i = childs.length; i--;) {
          childs[i].style.display = 'none';
        }

        document.body.appendChild(print);
        window.print();

        for (let i = childs.length; i--;) {
          childs[i].style.display = 'block';
        }
        document.body.removeChild(print);
      },
      print5() {
        const frame = document.getElementById('printFrame');
        // src/static文件夹中的文件需要复制到dist文件夹中
        frame.setAttribute('src', './static/print/print.html');
      }
    }
  };
</script>

<style scoped>
  .print {
    font-size: 18px;
    text-indent: 2em;
    color: brown;
  }
</style>
