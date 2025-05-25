---
title: Component v-model
description: component v-model
---

### Basic Usage​
`v-model` can be used on a component to implement a two-way binding.

Starting in Vue 3.4, the recommended approach to achieve this is using the `defineModel()` macro:

```
<!-- Child.vue -->
<script setup>
const model = defineModel()

function update() {
  model.value++
}
</script>

<template>
  <div>Parent bound v-model is: {{ model }}</div>
  <button @click="update">Increment</button>
</template>
```
The parent can then bind a value with `v-model`:

```
<!-- Parent.vue -->
<Child v-model="countModel" />
```
The value returned by `defineModel()` is a ref. It can be accessed and mutated like any other ref, except that it acts as a two-way binding between a parent value and a local one:

- Its `.value` is synced with the value bound by the parent `v-model`;
- When it is mutated by the child, it causes the parent bound value to be updated as well.
This means you can also bind this ref to a native input element with `v-model`, making it straightforward to wrap native input elements while providing the same `v-model` usage:

```
<script setup>
const model = defineModel()
</script>

<template>
  <input v-model="model" />
</template>
```

<a href="https://play.vuejs.org/" target="_blank" style="display: inline-flex; align-items: center; text-decoration: none; font-weight: bolder; color: blue;">
  ▶️ Try in the playground
</a>

### Under the Hood​
`defineModel` is a convenience macro. The compiler expands it to the following:

A prop named `modelValue`, which the local ref's value is synced with;
An event named `update:modelValue`, which is emitted when the local ref's value is mutated.
This is how you would implement the same child component shown above prior to 3.4:

```
<!-- Child.vue -->
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```

Then, `v-model="foo"` in the parent component will be compiled to:

```
<!-- Parent.vue -->
<Child
  :modelValue="foo"
  @update:modelValue="$event => (foo = $event)"
/>
```

As you can see, it is quite a bit more verbose. However, it is helpful to understand what is happening under the hood.

Because `defineModel` declares a prop, you can therefore declare the underlying prop's options by passing it to `defineModel`:

```
// making the v-model required
const model = defineModel({ required: true })

// providing a default value
const model = defineModel({ default: 0 })
```

:::TIP[WARNING]
If you have a `default` value for `defineModel` prop and you don't provide any value for this prop from the parent component, it can cause a de-synchronization between parent and child components. In the example below, the parent's `myRef` is undefined, but the child's `model` is 1:

Child component:

```
const model = defineModel({ default: 1 })
```

Parent component:
```
const myRef = ref()
```

```
<Child v-model="myRef"></Child>
```
:::