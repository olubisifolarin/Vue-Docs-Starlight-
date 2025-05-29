---
title: KeepAlive
description: KeepAlive
---

`<KeepAlive>` is a built-in component that allows us to conditionally cache component instances when dynamically switching between multiple components.

### Basic Usage​
In the Component Basics chapter, we introduced the syntax for Dynamic Components, using the `<component>` special element:

```
<component :is="activeComponent" />
```

By default, an active component instance will be unmounted when switching away from it. This will cause any changed state it holds to be lost. When this component is displayed again, a new instance will be created with only the initial state.

In the example below, we have two stateful components - A contains a counter, while B contains a message synced with an input via `v-model`. Try updating the state of one of them, switch away, and then switch back to it:

You'll notice that when switched back, the previous changed state would have been reset.

Creating fresh component instance on switch is normally useful behavior, but in this case, we'd really like the two component instances to be preserved even when they are inactive. To solve this problem, we can wrap our dynamic component with the `<KeepAlive>` built-in component:

```
<!-- Inactive components will be cached! -->
<KeepAlive>
  <component :is="activeComponent" />
</KeepAlive>
```

<?

<br></br>

<a href="https://play.vuejs.org/#eNqtU01v1DAQ/SuWL1u0ZYMEpyiN2FQ9AOJDhaMvaTKbunVsyx9hUZT/ztjOpruFUoG4xTPPz+/Nm4x0q/Vm8EBzWtjGcO2IBed1ySTvtTKOjMTe1kKo79ewIxPZGdWTFd5YLYhL1evt3Nhk8RQoTwHVCaCaAUw2SlpHGm8MSEcujh47i0wvmCyypAw14cFBr0XtAE+EFC0fSCNqay8YbaFXjMY6dkR9A6IsuNTeEfdDAyJM3XKEkOFlr1oQWJkfxlo+1MIHUHwWC1lJtkWWaP4HZ5U4q0ecHwD0VvAhGYqlBtFKhnnkPBhbCMsiW3qH+9kpQZHhSPCryI4GRc+Tq+eSNr9EvASkfIwHEWevnslEl5dznIvYPIwyPIVtq2tZRr6cjOPMPE3IGBoRcuOdU5K8bQRv7sMAAma9xgGsiyw1n7AYF+vvLCaDve1me6vVv/jDWI/9fQRr6w4It9FkYD+1mHboYWkQEXf3sSlnUd+Od5s7qyQaG8PtMJFecwHms3Yc9TOKz6SFYDT+QO9jzRkP54d6cwvN/W/qd3Yfaox+MWDBDMDo0nO16QA3L7Svvn6CPX4vTdTuBaL/0LwGq4QPGhOs8rJF2Ue4qPZdjIfL7pu92juQ9mAqCA3IKeIZxchCzE9Zf5D7evMm3mNyotNPPoanKQ==" target="_blank" style="display: inline-flex; align-items: center; text-decoration: none; font-weight: bolder; color: blue;">
  ▶️ Try it in the payground
</a>

##

:::tip[TIP]
When used in in-DOM templates, it should be referenced as `<keep-alive>`
:::

### Include / Exclude​
By default, `<KeepAlive>` will cache any component instance inside. We can customize this behavior via the `include` and `exclude` props. Both props can be a comma-delimited string, a `RegExp`, or an array containing either types:

```
<!-- comma-delimited string -->
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>

<!-- regex (use `v-bind`) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- Array (use `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>
```

The match is checked against the component's `name` option, so components that need to be conditionally cached by `KeepAlive` must explicitly declare a `name` option.

:::tip[TIP]
Since version 3.2.34, a single-file component using `<script setup>` will automatically infer its `name` option based on the filename, removing the need to manually declare the name.
:::


### Max Cached Instances​
We can limit the maximum number of component instances that can be cached via the `max` prop. When max is specified, `<KeepAlive>` behaves like an LRU cache: if the number of cached instances is about to exceed the specified `max` count, the least recently accessed cached instance will be destroyed to make room for the new one.

```
<KeepAlive :max="10">
  <component :is="activeComponent" />
</KeepAlive>
```

### Lifecycle of Cached Instance​
When a component instance is removed from the DOM but is part of a component tree cached by `<KeepAlive>`, it goes into a deactivated state instead of being unmounted. When a component instance is inserted into the DOM as part of a cached tree, it is activated.

A kept-alive component can register lifecycle hooks for these two states using `onActivated()` and `onDeactivated()`:

```
<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  // called on initial mount
  // and every time it is re-inserted from the cache
})

onDeactivated(() => {
  // called when removed from the DOM into the cache
  // and also when unmounted
})
</script>
```

Note that:

- `onActivated` is also called on mount, and onDeactivated on unmount.

- Both hooks work for not only the root component cached by `<KeepAlive>`, but also the descendant components in the cached tree.
