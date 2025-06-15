---
title: Composition API FAQ
description: Composition API FAQ
---

:::tip[TIP]
This FAQ assumes prior experience with Vue - in particular, experience with Vue 2 while primarily using Options API.
:::

### What is Composition API?​

<a href="https://vueschool.io/lessons/introduction-to-the-vue-js-3-composition-api?friend=vuejs" target="_blank" style="display: inline-flex; align-items: center; text-decoration: none; font-weight: bolder; color: blue;">
  ▶️ Watch a free video lesson on Vue School.
</a>

Composition API is a set of APIs that allows us to author Vue components using imported functions instead of declaring options. It is an umbrella term that covers the following APIs:

- [Reactivity API](), e.g. `ref()` and `reactive()`, that allows us to directly create reactive state, computed state, and watchers.

- [Lifecycle Hooks](), e.g. `onMounted()` and `onUnmounted()`, that allow us to programmatically hook into the component lifecycle.

- [Dependency Injection](), i.e. `provide()` and `inject()`, that allow us to leverage Vue's dependency injection system while using Reactivity APIs.

Composition API is a built-in feature of Vue 3 and Vue 2.7. For older Vue 2 versions, use the officially maintained `@vue/composition-api` plugin. In Vue 3, it is also primarily used together with the `<script setup>` syntax in Single-File Components. Here's a basic example of a component using Composition API:

```
<script setup>
import { ref, onMounted } from 'vue'

// reactive state
const count = ref(0)

// functions that mutate state and trigger updates
function increment() {
  count.value++
}

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```