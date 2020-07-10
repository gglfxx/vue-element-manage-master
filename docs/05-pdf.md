### 实现pdf.js官方的demo效果

##### 下载构建好的包

[地址](http://mozilla.github.io/pdf.js/getting_started/#download)

![Kt47mn.png](https://s2.ax1x.com/2019/10/23/Kt47mn.png)

将解压的 build 和 web 两个文件夹放入/static/pdf 中。



#### 1.使用远程服务器上的pdf文件

   如果后端直接提供pdf文件的地址，使用以下做法。

(1)在web/viewer.js中注释掉以下代码

```js
if (origin !== viewerOrigin && protocol !== 'blob:') {
  // throw new Error('file origin does not match viewer\'s');
}
```

(2)使用远程文件以后默认加载的本地pdf文件就不需要了，可以删除。然后最好将viewer.js和viewer.js.map中的相关设置取消(实际使用不修改这一部分代码也没问题)。

```js
defaultUrl: {
  // value: 'compressed.tracemonkey-pldi-09.pdf',
  value: '',
  kind: OptionKind.VIEWER
}
```

viewer.js.map

```
value: 'compressed.tracemonkey-pldi-09.pdf'
```

改为：

```
value: ''
```



(3)使用iframe插入viewer.html

```html
<iframe
  frameborder="0"
  width="100%"
  height="100%"
  :src="`./static/pdf/url/web/viewer.html?file=${encodeURIComponent('http://www.xdocin.com/xdoc?_key=fedii4dtyfhmvgryqyntfjavte&_func=down&_dir=pdfdemo.pdf')}`">
</iframe>
```

​    远程服务器上的文件地址最好使用encodeURIComponent()编码。

#### 2.使用base64格式的文件数据

​    如果后端给的文件不是文件在远程服务器上的地址，而是base64的数据，需要做以下处理。

(1)打开viewer.html，在<script src="viewer.js"></script>之前增加以下代码：

```js
// data.js是在本地存储的base64数据，实际开发从后端获取
<script src="../data.js"></script>
<script>
  // 去除DataURI中的换行和空格
  function filterData(data) {
    //[RFC2045]中有规定：base64一行不能超过76字符，超过则添加回车换行符。因此需要把base64字段中的换行符，回车符给去掉。
    // 如果后端返回的base64数据带有MIME类型，需要从MIME类型之后开始清除换行和回车符。
    // 如果不带MIME类型，直接去除回车和换行，然后使用atob解码(不需要手动加上MIME类型头)。
    const maker = ';base64,';
    let dataURI = '';
    if (data.indexOf(maker) > -1) {
      const base64Index = data.indexOf(maker) + maker.length;
      dataURI = data.substring(base64Index).replace(/[\r\n]/g, '');
    } else {
      dataURI = data.replace(/[\r\n]/g, '');
    }
    return dataURI;
  }
  //将dataURI转换成pdf.js能够直接解析的Uint8Array类型
  function convertDataURIToBinary(dataURI) {
    // 将base64解码
    const raw = window.atob(dataURI);
    const rawLength = raw.length;
    // 创建储存二进制数据的内存
    const buffer = new ArrayBuffer(rawLength);
    // 在buffer内存中创建8位不带符号整数的TypedArray视图
    const typedArray = new Uint8Array(buffer);
    for (let i = 0; i < rawLength; i++) {
      typedArray[i] = raw.charCodeAt(i) & 0xff;
    }
    return typedArray;
  }
  const DEFAULT_URL = convertDataURIToBinary(filterData(data));
</script>
```



<script src="../data.js"></script>
<script>
  // 去除DataURI中的换行和空格
  function filterData(data) {
    //[RFC2045]中有规定：base64一行不能超过76字符，超过则添加回车换行符。因此需要把base64字段中的换行符、回车符给去掉。
    // 如果后端返回的base64数据带有MIME类型，需要从MIME类型之后开始清除换行和回车符。
    // 如果不带MIME类型，直接去除回车和换行，然后使用atob解码(不需要手动加上MIME类型头)。
    const maker = ';base64,';
    let dataURI = '';
    if (data.indexOf(maker) > -1) {
      const base64Index = data.indexOf(maker) + maker.length;
      dataURI = data.substring(base64Index).replace(/[\r\n]/g, '');
    } else {
      dataURI = data.replace(/[\r\n]/g, '');
    }
    return dataURI;
  }
  //将dataURI转换成pdf.js能够直接解析的Uint8Array类型
  function convertDataURIToBinary(dataURI) {
    // 将base64解码为二进制字符串
    const raw = window.atob(dataURI);
    // 创建储存二进制数据的内存
    const buffer = new ArrayBuffer(raw.length);
    // 创建视图
    const typedArrayView = new Uint8Array(buffer);
    for (let i = 0; i < rawLength; i++) {
      typedArrayView[i] = raw.charCodeAt(i) & 0xff;
    }
    return typedArrayView;
  }
  const DEFAULT_URL = convertDataURIToBinary(filterData(data));
</script>

(2)在viewer.js设置默认default_url

```js
defaultUrl: {
  // value: 'compressed.tracemonkey-pldi-09.pdf',
  value: DEFAULT_URL,
  kind: OptionKind.VIEWER
},
```

然后将viewer.js.map中的也设置一下(不设置可以)：

![KdbCNQ.png](https://s2.ax1x.com/2019/10/25/KdbCNQ.png)

(3)使用

```html
<iframe
  frameborder="0"
  width="100%"
  height="100%"
  src="./static/pdf/base64/web/viewer.html">
</iframe>
```

