---
title: TypeScript with Composition API
description: TypeScript with Composition API
---

<a href="https://scrimba.com/links/vue-ts-composition-api" target="_blank" style="display: inline-flex; align-items: center; text-decoration: none; font-weight: bolder; color: blue;">
  ▶️ Watch an interactive video lesson on Scrimba.
</a>

### Typing Component Props​
#### Using `<script setup>​`
When using `<script setup>`, the `defineProps()` macro supports inferring the props types based on its argument:

```
<script setup lang="ts">
const props = defineProps({
  foo: { type: String, required: true },
  bar: Number
})

props.foo // string
props.bar // number | undefined
</script>
```

This is called "runtime declaration", because the argument passed to `defineProps()` will be used as the runtime `props` option.

However, it is usually more straightforward to define props with pure types via a generic type argument:

```
<script setup lang="ts">
const props = defineProps<{
  foo: string
  bar?: number
}>()
</script>
```

This is called "type-based declaration". The compiler will try to do its best to infer the equivalent runtime options based on the type argument. In this case, our second example compiles into the exact same runtime options as the first example.

You can use either type-based declaration OR runtime declaration, but you cannot use both at the same time.

We can also move the props types into a separate interface:

```
<script setup lang="ts">
interface Props {
  foo: string
  bar?: number
}

const props = defineProps<Props>()
</script>
```

This also works if `Props` is imported from an external source. This feature requires TypeScript to be a peer dependency of Vue.

```
<script setup lang="ts">
import type { Props } from './foo'

const props = defineProps<Props>()
</script>
```

