---
title: Props
description: Props
---

### Props Declaration​
Vue components require explicit props declaration so that Vue knows what external props passed to the component should be treated as fallthrough attributes (which will be discussed in its dedicated section).

In SFCs using `<script setup>`, props can be declared using the `defineProps()` macro:

```
<script setup>
const props = defineProps(['foo'])

console.log(props.foo)
</script>
```

In non-`<script setup>` components, props are declared using the `props` option:

```
export default {
  props: ['foo'],
  setup(props) {
    // setup() receives props as the first argument.
    console.log(props.foo)
  }
}
```