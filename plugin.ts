import { VueConstructor } from 'vue';

import InfiniteScroll from './infinite-scroll.vue';

export default {
  install(Vue: VueConstructor) {
    Vue.component('infinite-scroll', InfiniteScroll);
  },
};
