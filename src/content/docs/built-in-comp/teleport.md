---
title: Teleport
description: Teleport
---

<a href="https://vueschool.io/lessons/vue-3-teleport?friend=vuejs" target="_blank" style="display: inline-flex; align-items: center; text-decoration: none; font-weight: bolder; color: blue;">
  ▶️ Watch a free video lesson on Vue School
</a>

#

`<Teleport>` is a built-in component that allows us to "teleport" a part of a component's template into a DOM node that exists outside the DOM hierarchy of that component.

### Basic Usage​
Sometimes a part of a component's template belongs to it logically, but from a visual standpoint, it should be displayed somewhere else in the DOM, perhaps even outside of the Vue application.

The most common example of this is when building a full-screen modal. Ideally, we want the code for the modal's button and the modal itself to be written within the same single-file component, since they are both related to the open / close state of the modal. But that means the modal will be rendered alongside the button, deeply nested in the application's DOM hierarchy. This can create some tricky issues when positioning the modal via CSS.

Consider the following HTML structure.

```
<div class="outer">
  <h3>Vue Teleport Example</h3>
  <div>
    <MyModal />
  </div>
</div>
```