---
title: Composition API FAQ
description: Composition API FAQ
---

:::tip[TIP]
This FAQ assumes prior experience with Vue - in particular, experience with Vue 2 while primarily using Options API.
:::

### What is Composition API?​
</br>

<a href="https://vueschool.io/lessons/introduction-to-the-vue-js-3-composition-api?friend=vuejs" target="_blank" style="display: inline-flex; align-items: center; text-decoration: none; font-weight: bolder; color: blue;">
  ▶️ Watch a free video lesson on Vue School.
</a>
<br></br>

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

Despite an API style based on function composition, **Composition API is NOT functional programming**. Composition API is based on Vue's mutable, fine-grained reactivity paradigm, whereas functional programming emphasizes immutability.

If you are interested in learning how to use Vue with Composition API, you can set the site-wide API preference to Composition API using the toggle at the top of the left sidebar, and then go through the guide from the beginning.

### Why Composition API?​
#### Better Logic Reuse​
The primary advantage of Composition API is that it enables clean, efficient logic reuse in the form of [Composable functions](/Vue-Docs-Starlight-/reuseable/composables/). It solves [all the drawbacks of mixins](/Vue-Docs-Starlight-/reuseable/composables/#vs-mixins), the primary logic reuse mechanism for Options API.

Composition API's logic reuse capability has given rise to impressive community projects such as [VueUse](https://vueuse.org/), an ever-growing collection of composable utilities. It also serves as a clean mechanism for easily integrating stateful third-party services or libraries into Vue's reactivity system, for example immutable data, state machines, and RxJS.

