// 注册全局组件，这样使用的时候不用每次都import。
import Vue from "vue";
import SvgIcon from './svgIcon';

//导入所有svg图标，然后结合svg-sprite-loader可以按需使用
const requireContext = require.context('./SvgIcon/icons', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(requireContext)

Vue.component('svg-icon', SvgIcon);


