---
title: Events
description: Events
---

### Component Events​
This page assumes you've already read the Components Basics. Read that first if you are new to components.

### Emitting and Listening to Events​
A component can emit custom events directly in template expressions (e.g. in a `v-on` handler) using the built-in `$emit` method:

```
<!-- MyComponent -->
<button @click="$emit('someEvent')">Click Me</button>
```

The parent can then listen to it using `v-on:`

```
<MyComponent @some-event="callback" />
```

The `.once` modifier is also supported on component event listeners:

```
<MyComponent @some-event.once="callback" />
```

Like components and props, event names provide an automatic case transformation. Notice we emitted a camelCase event, but can listen for it using a kebab-cased listener in the parent. As with [props casing](/componenet/props), we recommend using kebab-cased event listeners in templates.