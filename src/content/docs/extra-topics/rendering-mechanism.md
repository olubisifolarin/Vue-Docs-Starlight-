---
title: Rendering Mechanism
description: Rendering Mechanism
---

How does Vue take a template and turn it into actual DOM nodes? How does Vue update those DOM nodes efficiently? We will attempt to shed some light on these questions here by diving into Vue's internal rendering mechanism.

### Virtual DOM​
You have probably heard about the term "virtual DOM", which Vue's rendering system is based upon.

The virtual DOM (VDOM) is a programming concept where an ideal, or “virtual”, representation of a UI is kept in memory and synced with the “real” DOM. The concept was pioneered by React, and has been adopted in many other frameworks with different implementations, including Vue.

Virtual DOM is more of a pattern than a specific technology, so there is no one canonical implementation. We can illustrate the idea using a simple example:

```
const vnode = {
  type: 'div',
  props: {
    id: 'hello'
  },
  children: [
    /* more vnodes */
  ]
}
```