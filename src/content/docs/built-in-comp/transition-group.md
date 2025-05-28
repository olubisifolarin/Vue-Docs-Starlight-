---
title: TransitionGroup
description: TransitionGroup
---

`<TransitionGroup>` is a built-in component designed for animating the insertion, removal, and order change of elements or components that are rendered in a list.

### Differences from `<Transition>​`
`<TransitionGroup>` supports the same props, CSS transition classes, and JavaScript hook listeners as `<Transition>`, with the following differences:

- By default, it doesn't render a wrapper element. But you can specify an element to be rendered with the `tag` prop.

- [Transition modes](/built-in-group/transition) are not available, because we are no longer alternating between mutually exclusive elements.

- Elements inside are **always required** to have a unique `key` attribute.

- CSS transition classes will be applied to individual elements in the list, not to the group / container itself.

:::tip[TIP]
When used in in-DOM templates, it should be referenced as `<transition-group>`.
:::