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