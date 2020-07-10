import Vue from 'vue';

import formatDate from './formatDate';


const filters = {
  formatDate,
}

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
})
