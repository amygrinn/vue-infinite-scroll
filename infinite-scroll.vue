<template>
<div
  :class="direction"
  @scroll="scroll$.next()">
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

<script lang="ts">

import { merge, Subject, Subscription, timer } from 'rxjs';
import { filter, tap, throttleTime } from 'rxjs/operators';

import Vue, { VNode, VueConstructor } from 'vue';

export default Vue.extend({
  beforeDestroy() {
    this.subscription.unsubscribe();
  },
  created() {
    this.subscription.add(
      merge(this.scroll$, timer(0, this.throttleTime)).pipe(
        filter(this.reachedBottom),
        throttleTime(this.throttleTime),
      ).subscribe(this.loadMore),
    );

    this.subscription.add(
      timer(0, this.throttleTime)
        .pipe(filter(() => !this.hasScrollbar()))
        .subscribe(this.loadMore),
    );
  },
  data: () => ({
    scroll$: new Subject(),
    subscription: new Subscription(),
  }),
  methods: {
    reachedBottom(): boolean {
      switch (this.direction) {
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
    },
    hasScrollbar(): boolean {
      switch (this.direction) {
        case 'down':
        case 'up':
          return this.$el.clientHeight < this.$el.scrollHeight;
        case 'right':
        case 'left':
          return this.$el.clientWidth < this.$el.scrollWidth;
        default: return true;
      }
    },
    loadMore(): void {
      this.$emit('load-more');
    },
  },
  props: {
    direction: {
      default: 'down',
      required: false,
      type: String,
    },
    minDistance: {
      default: 10,
      required: false,
      type: Number,
    },
    throttleTime: {
      default: 1000,
      required: false,
      type: Number,
    },
  },
});
</script>
