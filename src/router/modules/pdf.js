const InnerLayout = () => import( /* webpackChunkName:'innerLayout' */ '@/layouts/innerLayout');
const PdfBase = () => import( /* webpackChunkName:'pdfBse' */ '@/pages/pdf/pdfBase');
const PdfBase64 = () => import( /* webpackChunkName:'pdfBase64' */ '@/pages/pdf/pdfBase64');
const PdfPagination = () => import( /* webpackChunkName:'pdfPagination' */ '@/pages/pdf/pdfPagination');
const PdfAcroforms = () => import( /* webpackChunkName:'pdfAcroforms' */ '@/pages/pdf/pdfAcroforms');
const PdfSimple = () => import( /* webpackChunkName:'pdfSimple' */ '@/pages/pdf/pdfSimple');
const PdfPerfect = () => import( /* webpackChunkName:'pdfPerfect' */ '@/pages/pdf/pdfPerfect');
const PdfComponent = () => import( /* webpackChunkName:'pdfComponent' */ '@/pages/pdf/pdfComponent');



const route = {
  name: 'Pdf',
  path: '/pdf',
  component: InnerLayout,
  meta: {
    title: 'pdf',
    icon: 'pdf'
  },
  children: [{
    name: 'PdfBase',
    path: '/pdf/base',
    component: PdfBase,
    meta: {
      title: '基本使用',
    }
  }, {
    name: 'PdfBase64',
    path: '/pdf/base64',
    component: PdfBase64,
    meta: {
      title: 'base64',
    }
  }, {
    name: 'PdfPagination',
    path: '/pdf/pagination',
    component: PdfPagination,
    meta: {
      title: '分页',
    }
  }, {
    name: 'PdfAcroforms',
    path: '/pdf/acroforms',
    component: PdfAcroforms,
    meta: {
      title: 'acroforms',
    }
  }, {
    name: 'PdfSimple',
    path: '/pdf/simple',
    component: PdfSimple,
    meta: {
      title: 'simple',
    }
  }, {
    name: 'PdfPerfect',
    path: '/pdf/perfect',
    component: PdfPerfect,
    meta: {
      title: '所有功能',
    }
  }, {
    name: 'PdfComponent',
    path: '/pdf/component',
    component: PdfComponent,
    meta: {
      title: '组件封装',
    }
  }]
}

export default route;
