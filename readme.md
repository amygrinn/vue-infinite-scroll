# Vue Infinite Scroll

## [Demo](http://vue-infinite-scroll.tygr.info)

## Installation

### Node

```npm i --save @tygr/vue-infinite-scroll```

Register the component:

```javascript
import InfiniteScroll from '@tygr/vue-infinite-scroll';

export default {
  components: {
    'infinite-scroll': InfiniteScroll
  }
}
```

### Browser

```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://unpkg.com/@tygr/vue-infinite-scroll/dist/vue-infinite-scroll.min.js"></script>
<script>
  // Register the plugin globally
  Vue.use(InfiniteScroll.default)
</script>
```

## Usage

By default it will have 'overflow: scroll' and 'display: flex' in the correct directions based on the 'direction' prop

For vertical scrolling (direction = 'down' | 'up'), a specified height is necessary. By default it is 200 px.

```html
<template>
  <infinite-scroll @load-more="loadMore">
    <div v-for="i in numElements">Element {{ i }}</div>
  </infinite-scroll>
</template>

<script>
  export default {
    data: {
      numElements: 50
    },
    methods: {
      loadMore() {
        numElements += 50;
      }
    }
  }
</script>
```

## Events

| event     | payload | description                                                         |
| --------- | ------- | ------------------------------------------------------------------- |
| load-more | null    | Emitted whenever the user has reached the end of scrollable content |

## Props

| prop          | type    | default | description                                                                                                               |
| ------------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| direction     | String  | down    | The direction to scroll in order to load more items. Either 'down', 'up', 'left', or 'right'                              |
| minDistance   | Number  | 10      | The buffer distance to triger the 'load-more' event in pixels. Increase this if the event is not triggering               |
| throttleTime  | Number  | 1000    | The minimum amount of time between triggers of the 'load-more' event in milliseconds. Uses rxjs' 'throttleTime' operator  |
| repeat        | boolean | false   | Whether to keep calling 'load-more' after reaching bottom even if user has not scrolled further                           |
