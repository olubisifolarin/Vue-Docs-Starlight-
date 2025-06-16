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

#### More Flexible Code Organization​
Many users love that we write organized code by default with Options API: everything has its place based on the option it falls under. However, Options API poses serious limitations when a single component's logic grows beyond a certain complexity threshold. This limitation is particularly prominent in components that need to deal with multiple **logical concerns**, which we have witnessed first hand in many production Vue 2 apps.

Take the folder explorer component from Vue CLI's GUI as an example: this component is responsible for the following logical concerns:

- Tracking current folder state and displaying its content
- Handling folder navigation (opening, closing, refreshing...)
- Handling new folder creation
- Toggling show favorite folders only
- Toggling show hidden folders
- Handling current working directory changes

#### Better Type Inference​
In recent years, more and more frontend developers are adopting [TypeScript](https://www.typescriptlang.org/) as it helps us write more robust code, make changes with more confidence, and provides a great development experience with IDE support. However, the Options API, originally conceived in 2013, was designed without type inference in mind. We had to implement some [absurdly complex type gymnastics](https://github.com/vuejs/core/blob/44b95276f5c086e1d88fa3c686a5f39eb5bb7821/packages/runtime-core/src/componentPublicInstance.ts#L132-L165) to make type inference work with the Options API. Even with all this effort, type inference for Options API can still break down for mixins and dependency injection.

This had led many developers who wanted to use Vue with TS to lean towards Class API powered by `vue-class-component`. However, a class-based API heavily relies on ES decorators, a language feature that was only a stage 2 proposal when Vue 3 was being developed in 2019. We felt it was too risky to base an official API on an unstable proposal. Since then, the decorators proposal has gone through yet another complete overhaul, and finally reached stage 3 in 2022. In addition, class-based API suffers from logic reuse and organization limitations similar to Options API.

In comparison, Composition API utilizes mostly plain variables and functions, which are naturally type friendly. Code written in Composition API can enjoy full type inference with little need for manual type hints. Most of the time, Composition API code will look largely identical in TypeScript and plain JavaScript. This also makes it possible for plain JavaScript users to benefit from partial type inference.

#### Smaller Production Bundle and Less Overhead​
Code written in Composition API and `<script setup>` is also more efficient and minification-friendly than Options API equivalent. This is because the template in a `<script setup>` component is compiled as a function inlined in the same scope of the `<script setup>` code. Unlike property access from `this`, the compiled template code can directly access variables declared inside `<script setup>`, without an instance proxy in between. This also leads to better minification because all the variable names can be safely shortened.

### Relationship with Options API​
#### Trade-offs​
Some users moving from Options API found their Composition API code less organized, and concluded that Composition API is "worse" in terms of code organization. We recommend users with such opinions to look at that problem from a different perspective.

It is true that Composition API no longer provides the "guard rails" that guide you to put your code into respective buckets. In return, you get to author component code like how you would write normal JavaScript. This means **you can and should apply any code organization best practices to your Composition API code as you would when writing normal JavaScript**. If you can write well-organized JavaScript, you should also be able to write well-organized Composition API code.

Options API does allow you to "think less" when writing component code, which is why many users love it. However, in reducing the mental overhead, it also locks you into the prescribed code organization pattern with no escape hatch, which can make it difficult to refactor or improve code quality in larger scale projects. In this regard, Composition API provides better long term scalability.

#### Does Composition API cover all use cases?​
Yes in terms of stateful logic. When using Composition API, there are only a few options that may still be needed: `props`, `emits`, name, and `inheritAttrs`.

:::tip[TIP]
Since 3.3 you can directly use `defineOptions` in `<script setup>` to set the component name or `inheritAttrs` property
:::

If you intend to exclusively use Composition API (along with the options listed above), you can shave a few kbs off your production bundle via a compile-time flag that drops Options API related code from Vue. Note this also affects Vue components in your dependencies.

#### Can I use both APIs in the same component?​
Yes. You can use Composition API via the `setup()` option in an Options API component.

However, we only recommend doing so if you have an existing Options API codebase that needs to integrate with new features / external libraries written with Composition API.

#### Will Options API be deprecated?​
No, we do not have any plan to do so. Options API is an integral part of Vue and the reason many developers love it. We also realize that many of the benefits of Composition API only manifest in larger-scale projects, and Options API remains a solid choice for many low-to-medium-complexity scenarios.