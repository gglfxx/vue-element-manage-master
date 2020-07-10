const InnerLayout = () => import( /* webpackChunkName:'innerLayout' */ '@/layouts/innerLayout');
const Print = () => import( /* webpackChunkName:'print' */ '@/pages/other/print');
const Excel = () => import( /* webpackChunkName:'excel' */ '@/pages/other/excel');
const HtmlToCanvas = () => import( /* webpackChunkName:'htmlToCanvas' */ '@/pages/other/htmlToCanvas');
const AMap = () => import( /* webpackChunkName:'aMap' */ '@/pages/other/aMap');
const DragDialog = () => import( /* webpackChunkName:'dragDialog' */ '@/pages/other/dragDialog');
const Copy = () => import( /* webpackChunkName:'copy' */ '@/pages/other/copy');
const FileToBase64 = () => import( /* webpackChunkName:'fileToBase64' */ '@/pages/other/fileToBase64');
const TextEllipsis = () => import( /* webpackChunkName:'textEllipsis' */ '@/pages/other/textEllipsis');
const Scrollbar = () => import( /* webpackChunkName:'scrollbar' */ '@/pages/other/scrollbar');

const route = {
  name: 'Other',
  path: '/other',
  component: InnerLayout,
  meta: {
    title: '其他功能',
    icon: 'other'
  },
  children: [{
    name: 'Excel',
    path: '/other/excel',
    component: Excel,
    meta: {
      title: 'excel',
    }
  }, {
    name: 'AMap',
    path: '/other/aMap',
    component: AMap,
    meta: {
      title: '地图',
    }
  }, {
    name: 'Print',
    path: '/other/print',
    component: Print,
    meta: {
      title: '打印',
    }
  }, {
    name: 'DragDialog',
    path: '/other/dragDialog',
    component: DragDialog,
    meta: {
      title: '拖拽Dialog',
    }
  }, {
    name: 'Copy',
    path: '/other/copy',
    component: Copy,
    meta: {
      title: '快捷复制',
    }
  }, {
    name: 'HtmlToCanvas',
    path: '/other/htmlToCanvas',
    component: HtmlToCanvas,
    meta: {
      title: 'htmlToCanvas',
    }
  }, {
    name: 'FileToBase64',
    path: '/other/fileToBase64',
    component: FileToBase64,
    meta: {
      title: 'fileToBase64',
    }
  }, {
    name: 'TextEllipsisDemo',
    path: '/other/textEllipsis',
    component: TextEllipsis,
    meta: {
      title: '文本溢出',
    }
  }, {
    name: 'ScrollbarDemo',
    path: '/other/scrollbar',
    component: Scrollbar,
    meta: {
      title: '滚动条',
    }
  }]
}

export default route;
