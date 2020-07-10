import Vue from 'vue';

import copy from './copy';
import dragDialog from './dragDialog';
import permission from './permission';

Vue.directive('copy', copy);
Vue.directive('dragDialog', dragDialog);
Vue.directive('permission', permission);
