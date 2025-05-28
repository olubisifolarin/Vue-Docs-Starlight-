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

### Enter / Leave Transitions​
Here is an example of applying enter / leave transitions to a `v-for` list using `<TransitionGroup>`:

```
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</TransitionGroup>
```

```
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
```
### Move Transitions​
The above demo has some obvious flaws: when an item is inserted or removed, its surrounding items instantly "jump" into place instead of moving smoothly. We can fix this by adding a few additional CSS rules:

```
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
```

### Custom TransitionGroup classes​
You can also specify custom transition classes for the moving element by passing the `moveClass` prop to `<TransitionGroup>`, just like [custom transition classes](/built-in-group/transition) on `<Transition>`.

### Staggering List Transitions​
By communicating with JavaScript transitions through data attributes, it's also possible to stagger transitions in a list. First, we render the index of an item as a data attribute on the DOM element:

```
<TransitionGroup
  tag="ul"
  :css="false"
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @leave="onLeave"
>
  <li
    v-for="(item, index) in computedList"
    :key="item.msg"
    :data-index="index"
  >
    {{ item.msg }}
  </li>
</TransitionGroup>
```

Then, in JavaScript hooks, we animate the element with a delay based on the data attribute. This example is using the [GSAP library](https://gsap.com/) to perform the animation:

```
function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    height: '1.6em',
    delay: el.dataset.index * 0.15,
    onComplete: done
  })
}
```
</br>
<a href="https://play.vuejs.org/#eNqlVNtu00AQ/ZWRX5KgxG7F5cFKCzQqiBIVBH3DPCz22NlmvWv2kjaK8u/Mru3cuEioL4n3nNmZM2fG3kRvmyZeOYzSaGpyzRsLBq1rLjPJ60ZpCxvQWI4hV3XjLBawhVKrGgZ0abALqgxrOtw/EpHJXEljQXD6uYBvmQRKVZsqhcGVdjnCHHEA2/EhccPyJUeYLZg8pWYLly/hVmnNzW/X0MKcn6IfnazgndNrIjL5fS/pp0O9Jk3U13AwGO2Jvsd5q7k/DocjuLiEjU+uyRwtQ1dxyYVFPRxyi3WI8A8xFY+tmqsH1DNmcDiKucyFK9AMQ+F4xYTDEZXdhtKlk7nlSoKSV1gqjdfSZ0UxaiuiiI1dC4xVw3JuvfCzI3yBvFp4vQRTo0cZ+1xjKJTELqOfEEkMcAAAutwpnAcLAdqk5OJ5/ArrQYcWKBgFUemCWWrOUm8FPsIzOIvPX3ZBSs7IOIEW01DVo77VU21zZCv8H21nJ9r681NVTZN282nn6UAzbASzSCeAKZe0ArCa1IqqXGRRGGEWQdLSd5pJw31D77VyTVvKsooincii9pzmxhBQMmGwx978CLOeoB8QkUfD3wXt2WNceOsCHkxs8aCINAnePgDJppQUFjZ0DMGVEf0dLXqflHQucU3R/RYfEN7XSbjuef/fk11Reus2u/WHLZkapCSCtz4lJ0YROk0OnI7GUfslmdQ0/3ujJH2QwvypXiBMFqX9RmSRXxMPZNHC2sakSeJks6xiaizx3GualxOdMaRmSwWsobe85NVJeu8FF6g/NV7dcRkmhHq4CZjVDrtVojsLzJd/wO8NGeNVfdZoUPvJ7DjLdIXktqevv97iIz3vyF7uP8gvaJRwXmMbduVkQbIP4oLaD8EtLqs7c/1okUzvmvJCgxshPovo++3fiL+1vpf7PH6xc3H7C0PdB/0=" target="_blank" style="display: inline-flex; align-items: center; text-decoration: none; font-weight: bolder; color: blue;">
  ▶️ Try it in the payground
</a>