---
title: Suspense
description: Suspense
---

:::danger[Experimental Feature]
`<Suspense>` is an experimental feature. It is not guaranteed to reach stable status and the API may change before it does.
:::

`<Suspense>` is a built-in component for orchestrating async dependencies in a component tree. It can render a loading state while waiting for multiple nested async dependencies down the component tree to be resolved.

### Async Dependencies​
To explain the problem `<Suspense>` is trying to solve and how it interacts with these async dependencies, let's imagine a component hierarchy like the following:

```
<Suspense>
└─ <Dashboard>
   ├─ <Profile>
   │  └─ <FriendStatus> (component with async setup())
   └─ <Content>
      ├─ <ActivityFeed> (async component)
      └─ <Stats> (async component)
```

In the component tree there are multiple nested components whose rendering depends on some async resource to be resolved first. Without `<Suspense>`, each of them will need to handle its own loading / error and loaded states. In the worst case scenario, we may see three loading spinners on the page, with content displayed at different times.

The `<Suspense>` component gives us the ability to display top-level loading / error states while we wait on these nested async dependencies to be resolved.

There are two types of async dependencies that `<Suspense>` can wait on:

- Components with an async `setup()` hook. This includes components using `<script setup>` with top-level await expressions.

- Async Components.

#### `async` setup()​
A Composition API component's `setup()` hook can be async:

```
export default {
  async setup() {
    const res = await fetch(...)
    const posts = await res.json()
    return {
      posts
    }
  }
}
```
If using `<script setup>`, the presence of top-level `await` expressions automatically makes the component an async dependency:

```
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

#### Async Components​
Async components are "suspensible" by default. This means that if it has a `<Suspense>` in the parent chain, it will be treated as an async dependency of that `<Suspense>`. In this case, the loading state will be controlled by the `<Suspense>`, and the component's own loading, error, delay and timeout options will be ignored.

The async component can opt-out of `Suspense` control and let the component always control its own loading state by specifying `suspensible:` false in its options.

### Loading State​
The `<Suspense>` component has two slots: `#default` and `#fallback`. Both slots only allow for one immediate child node. The node in the default slot is shown if possible. If not, the node in the fallback slot will be shown instead.

```
<Suspense>
  <!-- component with nested async dependencies -->
  <Dashboard />

  <!-- loading state via #fallback slot -->
  <template #fallback>
    Loading...
  </template>
</Suspense>
```

On initial render, `<Suspense>` will render its default slot content in memory. If any async dependencies are encountered during the process, it will enter a pending state. During the pending state, the fallback content will be displayed. When all encountered async dependencies have been resolved, `<Suspense>` enters a resolved state and the resolved default slot content is displayed.

If no async dependencies were encountered during the initial render, `<Suspense>` will directly go into a resolved state.

Once in a resolved state, `<Suspense>` will only revert to a pending state if the root node of the `#default` slot is replaced. New async dependencies nested deeper in the tree will not cause the `<Suspense>` to revert to a pending state.

When a revert happens, fallback content will not be immediately displayed. Instead, `<Suspense>` will display the previous #default content while waiting for the new content and its async dependencies to be resolved. This behavior can be configured with the timeout prop: `<Suspense>` will switch to fallback content if it takes longer than timeout to render the new default content. A `timeout `value of 0 will cause the fallback content to be displayed immediately when default content is replaced.
