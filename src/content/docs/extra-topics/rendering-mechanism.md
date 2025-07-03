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

Here, `vnode` is a plain JavaScript object (a "virtual node") representing a `<div>` element. It contains all the information that we need to create the actual element. It also contains more children vnodes, which makes it the root of a virtual DOM tree.

A runtime renderer can walk a virtual DOM tree and construct a real DOM tree from it. This process is called mount.

If we have two copies of virtual DOM trees, the renderer can also walk and compare the two trees, figuring out the differences, and apply those changes to the actual DOM. This process is called patch, also known as "diffing" or "reconciliation".

The main benefit of virtual DOM is that it gives the developer the ability to programmatically create, inspect and compose desired UI structures in a declarative way, while leaving the direct DOM manipulation to the renderer.

### Render Pipeline​

At the high level, this is what happens when a Vue component is mounted:

1. **Compile**: Vue templates are compiled into **render functions**: functions that return virtual DOM trees. This step can be done either ahead-of-time via a build step, or on-the-fly by using the runtime compiler.

2. **Mount**: The runtime renderer invokes the render functions, walks the returned virtual DOM tree, and creates actual DOM nodes based on it. This step is performed as a reactive effect, so it keeps track of all reactive dependencies that were used.

3. **Patch**: When a dependency used during mount changes, the effect re-runs. This time, a new, updated Virtual DOM tree is created. The runtime renderer walks the new tree, compares it with the old one, and applies necessary updates to the actual DOM.

### Templates vs. Render Functions​

Vue templates are compiled into virtual DOM render functions. Vue also provides APIs that allow us to skip the template compilation step and directly author render functions. Render functions are more flexible than templates when dealing with highly dynamic logic, because you can work with vnodes using the full power of JavaScript.

So why does Vue recommend templates by default? There are a number of reasons:

1. Templates are closer to actual HTML. This makes it easier to reuse existing HTML snippets, apply accessibility best practices, style with CSS, and for designers to understand and modify.

2. Templates are easier to statically analyze due to their more deterministic syntax. This allows Vue's template compiler to apply many compile-time optimizations to improve the performance of the virtual DOM (which we will discuss below).

In practice, templates are sufficient for most use cases in applications. Render functions are typically only used in reusable components that need to deal with highly dynamic rendering logic. Render function usage is discussed in more detail in Render Functions & JSX.

### Compiler-Informed Virtual DOM​
The virtual DOM implementation in React and most other virtual-DOM implementations are purely runtime: the reconciliation algorithm cannot make any assumptions about the incoming virtual DOM tree, so it has to fully traverse the tree and diff the props of every vnode in order to ensure correctness. In addition, even if a part of the tree never changes, new vnodes are always created for them on each re-render, resulting in unnecessary memory pressure. This is one of the most criticized aspect of virtual DOM: the somewhat brute-force reconciliation process sacrifices efficiency in return for declarativeness and correctness.

But it doesn't have to be that way. In Vue, the framework controls both the compiler and the runtime. This allows us to implement many compile-time optimizations that only a tightly-coupled renderer can take advantage of. The compiler can statically analyze the template and leave hints in the generated code so that the runtime can take shortcuts whenever possible. At the same time, we still preserve the capability for the user to drop down to the render function layer for more direct control in edge cases. We call this hybrid approach **Compiler-Informed Virtual DOM**.

<!-- Below, we will discuss a few major optimizations done by the Vue template compiler to improve the virtual DOM's runtime performance. -->