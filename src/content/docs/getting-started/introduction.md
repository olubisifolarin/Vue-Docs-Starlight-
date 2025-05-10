---
title: Introduction
description: A guide in my new Starlight docs site.
---

:::note

- Vue 2 support has ended on Dec 31, 2023. Learn more about Vue 2 EOL.
- Upgrading from Vue 2? Check out the Migration Guide.
:::

## What is Vue?

Vue (pronounced /vjuː/, like view) is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS, and JavaScript and provides a declarative, component-based programming model that helps you efficiently develop user interfaces of any complexity.

Here is a minimal example:

'''
import { createApp, ref } from 'vue'

createApp({
  setup() {
    return {
      count: ref(0)
    }
  }
}).mount('#app')
'''

```
<div id="app">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>
```
Result: