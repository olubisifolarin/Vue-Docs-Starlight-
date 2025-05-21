---
title: Registration
description: Registration
---

### Component Registration​

<a href="https://vueschool.io/lessons/vue-3-global-vs-local-vue-components?friend=vuejs" target="_blank" style="display: inline-flex; align-items: center; text-decoration: none; font-weight: bolder; color: blue;">
  ▶️ Watch a free video lesson on Vue School
</a>

A Vue component needs to be "registered" so that Vue knows where to locate its implementation when it is encountered in a template. There are two ways to register components: global and local.

### Global Registration​
We can make components available globally in the current [Vue application](/essentials/creating-app) using the `.component()` method:

```
import { createApp } from 'vue'

const app = createApp({
  /* root component options */
})
```

If using SFCs, you will be registering the imported `.vue` files:

```
import MyComponent from './App.vue'

app.component('MyComponent', MyComponent)
```

The `.component()` method can be chained:

```
app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)
```

Globally registered components can be used in the template of any component within this application:

```
<!-- this will work in any component inside the app -->
<ComponentA/>
<ComponentB/>
<ComponentC/>
```

This even applies to all subcomponents, meaning all three of these components will also be available inside each other.