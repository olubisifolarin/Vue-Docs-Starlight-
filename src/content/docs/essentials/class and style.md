---
title: Class and Style Bindings
description: Class and style bindings
---

common need for data binding is manipulating an element's class list and inline styles. Since class and style are both attributes, we can use v-bind to assign them a string value dynamically, much like with other attributes. However, trying to generate those values using string concatenation can be annoying and error-prone. For this reason, Vue provides special enhancements when v-bind is used with class and style. In addition to strings, the expressions can also evaluate to objects or arrays.

### Binding HTML Classes

##### [▶️ Watch a free video lesson on Vue School](https://vueschool.io/lessons/vue-fundamentals-capi-dynamic-css-classes-with-vue?friend=vuejs)

#### Binding to Objects​
We can pass an object to `:class` (short for `v-bind:class`) to dynamically toggle classes:

```
<div :class="{ active: isActive }"></div>
```

The above syntax means the presence of the `active` class will be determined by the truthiness of the data property `isActive`.

You can have multiple classes toggled by having more fields in the object. In addition, the `:class` directive can also co-exist with the plain `class` attribute. So given the following state:

```
const isActive = ref(true)
const hasError = ref(false)
```

And the following template:

```
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

It will render:

```
<div class="static active"></div>
```

When `isActive` or `hasError` changes, the class list will be updated accordingly. For example, if `hasError` becomes `true`, the class list will become `"static active text-danger"`.

The bound object doesn't have to be inline:

```
const classObject = reactive({
  active: true,
  'text-danger': false
})
```
```
<div :class="classObject"></div>
```
This will render:

```
<div class="active"></div>
```

We can also bind to a [computed property](/essentials/computed) that returns an object. This is a common and powerful pattern:

```
const isActive = ref(true)
const error = ref(null)

const classObject = computed(() => ({
  active: isActive.value && !error.value,
  'text-danger': error.value && error.value.type === 'fatal'
}))
```

```
<div :class="classObject"></div>
```

### Binding to Arrays​
We can bind `:class` to an array to apply a list of classes:

```
const activeClass = ref('active')
const errorClass = ref('text-danger')
```

```
<div :class="[activeClass, errorClass]"></div>
```

Which will render:

```
<div class="active text-danger"></div>
```
If you would like to also toggle a class in the list conditionally, you can do it with a ternary expression:

```
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```