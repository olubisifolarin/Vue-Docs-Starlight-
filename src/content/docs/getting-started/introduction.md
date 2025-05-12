---
title: Introduction
description: Introduction to Vue Documentation.
---

:::note[You are reading the documentation for Vue 3!]

- Vue 2 support has ended on Dec 31, 2023. Learn more about Vue 2 EOL.
- Upgrading from Vue 2? Check out the Migration Guide.
:::

## What is Vue?

Vue (pronounced /vjuː/, like view) is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS, and JavaScript and provides a declarative, component-based programming model that helps you efficiently develop user interfaces of any complexity.

:::note[Prerequisites]

The documentation assumes basic familiarity with HTML, CSS, and JavaScript. If you are totally new to frontend development, it might not be the best idea to jump right into a framework as your first step - grasp the basics and then come back! You can check your knowledge level with these overviews for JavaScript, HTML and CSS if needed. Prior experience with other frameworks helps, but is not required.
:::


```
import { createApp, ref } from 'vue'

createApp({
  setup() {
    return {
      count: ref(0)
    }
  }
}).mount('#app')
```

```
<div id="app">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>
```

Result

<Counter />