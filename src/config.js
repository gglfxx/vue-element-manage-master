/* 应用配置 */

// 路由权限表
// 如果配置了一级路由，则它之下的所有子路由都可访问。
const permission = {
  admin: ['Icon', 'Chart', 'Form', 'Table', 'Excel', 'Tab', 'AMap', 'Error', 'Permission', 'User', 'Article', 'Pdf', 'Other', '404'],
  guest: ['Icon', 'Chart', 'Form', 'Table', 'Excel', 'Tab', 'AMap', 'Error', 'Other', '404'],
  editor: ['Article', 'Error', 'Other', '404']
}


const config = {
  permission,
  apiURL: 'https://mock.api',
  // 主题
  theme: '#373737',
  // 是否折叠侧边菜单
  sideCollapse: false,
  // 是否启用标签导航
  tagVisible: true,
  // 系统风格
  style: 'round',
  // 组件大小
  size: 'medium'
}


export default config;
