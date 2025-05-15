---
title: Reactivity Fundamentals
description: Reactivity fundamentals
---

:::note[API Reference]
This page and many other chapters later in the guide contain different content for the Options API and the Composition API. Your current preference is Composition API. You can toggle between the API styles using the "API Preference" switches at the top of the left sidebar.
:::

### Declaring Reactive State​
`ref()`​
In Composition API, the recommended way to declare reactive state is using the ref() function:

```
import { ref } from 'vue'

const count = ref(0)
```

`ref()` takes the argument and returns it wrapped within a ref object with a `.value` property:

```
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

To access refs in a component's template, declare and return them from a component's `setup()` function:

```
import { ref } from 'vue'

export default {
  // `setup` is a special hook dedicated for the Composition API.
  setup() {
    const count = ref(0)

    // expose the ref to the template
    return {
      count
    }
  }
}
```
```
<div>{{ count }}</div>
```

Notice that we did not need to append `.value` when using the ref in the template. For convenience, refs are automatically unwrapped when used inside templates (with a few caveats).

You can also mutate a ref directly in event handlers:

```
<button @click="count++">
  {{ count }}
</button>
```

For more complex logic, we can declare functions that mutate refs in the same scope and expose them as methods alongside the state:

```
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    function increment() {
      // .value is needed in JavaScript
      count.value++
    }

    // don't forget to expose the function as well.
    return {
      count,
      increment
    }
  }
}
```
Exposed methods can then be used as event handlers:

```
<button @click="increment">
  {{ count }}
</button>
```
Here's the example live on [Codepen](https://codepen.io/vuejs-examples/pen/WNYbaqo), without using any build tools.

`<script setup>​`
Manually exposing state and methods via setup() can be verbose. Luckily, it can be avoided when using [Single-File Components (SFCs)](). We can simplify the usage with `<script setup>`:

```
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
```

[▶️ Try it in the Playground](https://play.vuejs.org/)

Top-level imports, variables and functions declared in `<script setup>` are automatically usable in the template of the same component. Think of the template as a JavaScript function declared in the same scope - it naturally has access to everything declared alongside it.

:::tip[TIP]
For the rest of the guide, we will be primarily using SFC + `<script setup>` syntax for the Composition API code examples, as that is the most common usage for Vue developers.

If you are not using SFC, you can still use Composition API with the `setup()` option.
:::

### Why Refs?​
You might be wondering why we need refs with the `.value` instead of plain variables. To explain that, we will need to briefly discuss how Vue's reactivity system works.

When you use a ref in a template, and change the ref's value later, Vue automatically detects the change and updates the DOM accordingly. This is made possible with a dependency-tracking based reactivity system. When a component is rendered for the first time, Vue **tracks** every ref that was used during the render. Later on, when a ref is mutated, it will **trigger** a re-render for components that are tracking it.

In standard JavaScript, there is no way to detect the access or mutation of plain variables. However, we can intercept the get and set operations of an object's properties using getter and setter methods.

The `.value` property gives Vue the opportunity to detect when a ref has been accessed or mutated. Under the hood, Vue performs the tracking in its getter, and performs triggering in its setter. Conceptually, you can think of a ref as an object that looks like this:

```
// pseudo code, not actual implementation
const myRef = {
  _value: 0,
  get value() {
    track()
    return this._value
  },
  set value(newValue) {
    this._value = newValue
    trigger()
  }
}
```

Another nice trait of refs is that unlike plain variables, you can pass refs into functions while retaining access to the latest value and the reactivity connection. This is particularly useful when refactoring complex logic into reusable code.

The reactivity system is discussed in more details in the [Reactivity in Depth]() section.

### Deep Reactivity
Refs can hold any value type, including deeply nested objects, arrays, or JavaScript built-in data structures like `Map`.

A ref will make its value deeply reactive. This means you can expect changes to be detected even when you mutate nested objects or arrays: