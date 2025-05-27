---
title: Transition
description: Transition
---

Vue offers two built-in components that can help work with transitions and animations in response to changing state:

- `<Transition>` for applying animations when an element or component is entering and leaving the DOM. This is covered on this page.

- `<TransitionGroup>` for applying animations when an element or component is inserted into, removed from, or moved within a `v-for` list. This is covered in [the next chapter](/built-in-comp/transition-group).

Aside from these two components, we can also apply animations in Vue using other techniques such as toggling CSS classes or state-driven animations via style bindings. These additional techniques are covered in the Animation Techniques chapter.

### The `<Transition>` Component​
`<Transition>` is a built-in component: this means it is available in any component's template without having to register it. It can be used to apply enter and leave animations on elements or components passed to it via its default slot. The enter or leave can be triggered by one of the following:

- Conditional rendering via `v-if`
- Conditional display via `v-show`
- Dynamic components toggling via the `<component>` special element
- Changing the special `key` attribute

This is an example of the most basic usage:

```
<button @click="show = !show">Toggle</button>
<Transition>
  <p v-if="show">hello</p>
</Transition>
```

```
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
```
</br>
<a href="https://play.vuejs.org/" target="_blank" style="display: inline-flex; align-items: center; text-decoration: none; font-weight: bolder; color: blue;">
  ▶️ Try it in the playground
</a>

:::tip[TIP]
`<Transition>` only supports a single element or component as its slot content. If the content is a component, the component must also have only one single root element.
:::

When an element in a `<Transition>` component is inserted or removed, this is what happens:

Vue will automatically sniff whether the target element has CSS transitions or animations applied. If it does, a number of CSS transition classes will be added / removed at appropriate timings.

If there are listeners for JavaScript hooks, these hooks will be called at appropriate timings.

If no CSS transitions / animations are detected and no JavaScript hooks are provided, the DOM operations for insertion and/or removal will be executed on the browser's next animation frame.

### CSS-Based Transitions​
#### Transition Classes​
There are six classes applied for enter / leave transitions.

1. `v-enter-from`: Starting state for enter. Added before the element is inserted, removed one frame after the element is inserted.

2. `v-enter-active`: Active state for enter. Applied during the entire entering phase. Added before the element is inserted, removed when the transition/animation finishes. This class can be used to define the duration, delay and easing curve for the entering transition.

3. `v-enter-to`: Ending state for enter. Added one frame after the element is inserted (at the same time `v-enter-from` is removed), removed when the transition/animation finishes.

4. `v-leave-from`: Starting state for leave. Added immediately when a leaving transition is triggered, removed after one frame.

5. `v-leave-active`: Active state for leave. Applied during the entire leaving phase. Added immediately when a leaving transition is triggered, removed when the transition/animation finishes. This class can be used to define the duration, delay and easing curve for the leaving transition.

6. `v-leave-to`: Ending state for leave. Added one frame after a leaving transition is triggered (at the same time `v-leave-from` is removed), removed when the transition/animation finishes.

7. `v-enter-active` and `v-leave-active` give us the ability to specify different easing curves for enter / leave transitions, which we'll see an example of in the following sections.

#### Named Transitions

A transition can be named via the name prop:

```
<Transition name="fade">
  ...
</Transition>
```

For a named transition, its transition classes will be prefixed with its name instead of v. For example, the applied class for the above transition will be `fade-enter-active` instead of `v-enter-active`. The CSS for the fade transition should look like this:

```
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
```

#### CSS Transitions​
`<Transition>` is most commonly used in combination with native CSS transitions, as seen in the basic example above. The `transition` CSS property is a shorthand that allows us to specify multiple aspects of a transition, including properties that should be animated, duration of the transition, and easing curves.

Here is a more advanced example that transitions multiple properties, with different durations and easing curves for enter and leave:

```
<Transition name="slide-fade">
  <p v-if="show">hello</p>
</Transition>
```

```
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
```

</br>
<a href="https://play.vuejs.org/" target="_blank" style="display: inline-flex; align-items: center; text-decoration: none; font-weight: bolder; color: blue;">
  ▶️ Try it in the playground
</a>

#### CSS Animations​
Native CSS animations are applied in the same way as CSS transitions, with the difference being that `*-enter-from` is not removed immediately after the element is inserted, but on an `animationend` event.

For most CSS animations, we can simply declare them under the `*-enter-active` and `*-leave-active` classes. Here's an example:

```
<Transition name="bounce">
  <p v-if="show" style="text-align: center;">
    Hello here is some bouncy text!
  </p>
</Transition>
```

```
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
```
</br>
<a href="https://play.vuejs.org/" target="_blank" style="display: inline-flex; align-items: center; text-decoration: none; font-weight: bolder; color: blue;">
  ▶️ Try it in the playground
</a>

#### Custom Transition Classes​
You can also specify custom transition classes by passing the following props to <Transition>:

- enter-from-class
- enter-active-class
- enter-to-class
- leave-from-class
- leave-active-class
- leave-to-class

These will override the conventional class names. This is especially useful when you want to combine Vue's transition system with an existing CSS animation library, such as [Animate.css](https://daneden.github.io/animate.css/):

```
<!-- assuming Animate.css is included on the page -->
<Transition
  name="custom-classes"
  enter-active-class="animate__animated animate__tada"
  leave-active-class="animate__animated animate__bounceOutRight"
>
  <p v-if="show">hello</p>
</Transition>
```

</br>
<a href="https://play.vuejs.org/" target="_blank" style="display: inline-flex; align-items: center; text-decoration: none; font-weight: bolder; color: blue;">
  ▶️ Try it in the playground
</a>