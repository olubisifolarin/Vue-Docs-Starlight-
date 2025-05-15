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