---
title: TypeScript with Option API
description: TypeScript with Options API
---

This page assumes you've already read the overview on [Using Vue with TypeScript](/Vue-Docs-Starlight-/typescripts/overview).

:::tip[TIP]
While Vue does support TypeScript usage with Options API, it is recommended to use Vue with TypeScript via Composition API as it offers simpler, more efficient and more robust type inference.
:::

### Typing Component Props​
Type inference for props in Options API requires wrapping the component with `defineComponent()`. With it, Vue is able to infer the types for the `props` based on the props option, taking additional options such as `required: true` and `default` into account:

```
import { defineComponent } from 'vue'

export default defineComponent({
  // type inference enabled
  props: {
    name: String,
    id: [Number, String],
    msg: { type: String, required: true },
    metadata: null
  },
  mounted() {
    this.name // type: string | undefined
    this.id // type: number | string | undefined
    this.msg // type: string
    this.metadata // type: any
  }
})
```

#### Caveats​
If your TypeScript version is less than `4.7`, you have to be careful when using function values for `validator` and `default` prop options - make sure to use arrow functions:

```
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

interface Book {
  title: string
  year?: number
}

export default defineComponent({
  props: {
    bookA: {
      type: Object as PropType<Book>,
      // Make sure to use arrow functions if your TypeScript version is less than 4.7
      default: () => ({
        title: 'Arrow Function Expression'
      }),
      validator: (book: Book) => !!book.title
    }
  }
})
```

This prevents TypeScript from having to infer the type of `this` inside these functions, which, unfortunately, can cause the type inference to fail.

### Typing Component Emits​
We can declare the expected payload type for an emitted event using the object syntax of the `emits` option. Also, all non-declared emitted events will throw a type error when called:

```
import { defineComponent } from 'vue'

export default defineComponent({
  emits: {
    addBook(payload: { bookName: string }) {
      // perform runtime validation
      return payload.bookName.length > 0
    }
  },
  methods: {
    onSubmit() {
      this.$emit('addBook', {
        bookName: 123 // Type error!
      })

      this.$emit('non-declared-event') // Type error!
    }
  }
})
```

### Typing Computed Properties​
A computed property infers its type based on its return value:

```
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      message: 'Hello!'
    }
  },
  computed: {
    greeting() {
      return this.message + '!'
    }
  },
  mounted() {
    this.greeting // type: string
  }
})
```

In some cases, you may want to explicitly annotate the type of a computed property to ensure its implementation is correct:

```
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      message: 'Hello!'
    }
  },
  computed: {
    // explicitly annotate return type
    greeting(): string {
      return this.message + '!'
    },

    // annotating a writable computed property
    greetingUppercased: {
      get(): string {
        return this.greeting.toUpperCase()
      },
      set(newValue: string) {
        this.message = newValue.toUpperCase()
      }
    }
  }
})
```

Explicit annotations may also be required in some edge cases where TypeScript fails to infer the type of a computed property due to circular inference loops.

### Typing Event Handlers​
When dealing with native DOM events, it might be useful to type the argument we pass to the handler correctly. Let's take a look at this example:

```
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    handleChange(event) {
      // `event` implicitly has `any` type
      console.log(event.target.value)
    }
  }
})
</script>

<template>
  <input type="text" @change="handleChange" />
</template>
```

Without type annotation, the `event` argument will implicitly have a type of `any`. This will also result in a TS error if `"strict": true` or `"noImplicitAny": true` are used in `tsconfig.json`. It is therefore recommended to explicitly annotate the argument of event handlers. In addition, you may need to use type assertions when accessing the properties of `event`:

```
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    handleChange(event: Event) {
      console.log((event.target as HTMLInputElement).value)
    }
  }
})
```