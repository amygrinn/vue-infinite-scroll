<template>
<div
  :class="direction"
  v-stream:scroll="scroll$">
  <slot></slot>
</div>
</template>

<style scoped>

.down {
  display: flex;
  flex-direction: column;
  height: 200px;
  overflow-y: scroll;
}

.right {
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
}

.up {
  display: flex;
  flex-direction: column-reverse;
  height: 200px;
  overflow-y: scroll;
}

.left {
  display: flex;
  flex-direction: row-reverse;
  overflow-x: scroll;
}

</style>

<script>
import { Subject } from 'rxjs';
import { filter, tap, throttleTime } from 'rxjs/operators';

import Vue from 'vue';
import VueRx from 'vue-rx';

Vue.use(VueRx);

export default {
  props: {
    direction: {
      type: String,
      default: 'down',
      required: false
    },
    minDistance: {
      type: Number,
      default: 10,
      required: false
    },
    throttleTime: {
      type: Number,
      default: 1000,
      required: false
    }
  },
  data: () => ({
    scroll$: new Subject()
  }),
  methods: {
    reachedBottom() {
      switch(this.direction) {
        case 'down':
          return this.$el.scrollTop + this.$el.clientHeight >= this.$el.scrollHeight - this.minDistance;
        case 'up':
          return this.$el.scrollTop <= this.minDistance;
        case 'right':
          return this.$el.scrollLeft + this.$el.clientWidth >= this.$el.scrollWidth - this.minDistance;
        case 'left':
          return this.$el.scrollLeft <= this.minDistance;
        default: return false;
      }
    }
  },
  subscriptions() { return {
    loadMore: this.scroll$
      .pipe(
        filter(this.reachedBottom),
        throttleTime(this.throttleTime),
        tap(() => this.$emit('load-more'))
      )
  }}
}
</script>
