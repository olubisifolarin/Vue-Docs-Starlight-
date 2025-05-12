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

The documentation assumes basic familiarity with HTML, CSS, and JavaScript. If you are totally new to frontend development, it might not be the best idea to jump right into a framework as your first step - grasp the basics and then come back! You can check your knowledge level with these overviews for [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Language_overview), [HTML](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content) and [CSS](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics) if needed. Prior experience with other frameworks helps, but is not required.
:::

## The Progressive Framework​

Vue is a framework that covers most of the common features needed in frontend development. But the web is extremely diverse - the things we build on the web may vary drastically in form and scale. With that in mind, Vue is designed to be flexible and incrementally adoptable. Depending on your use case, Vue can be used in different ways:

- Enhancing static HTML without a build step
- Embedding as Web Components on any page
- Single-Page Application (SPA)
- Fullstack / Server-Side Rendering (SSR)
- Jamstack / Static Site Generation (SSG)
- Targeting desktop, mobile, WebGL, and even the terminal

If you find these concepts intimidating, don't worry! The tutorial and guide only require basic HTML and JavaScript knowledge, and you should be able to follow along without being an expert in any of these.

If you are an experienced developer interested in how to best integrate Vue into your stack, or you are curious about what these terms mean, we discuss them in more [detail in Ways of Using Vue]().

## Single-File Components​
In most build-tool-enabled Vue projects, we author Vue components using an HTML-like file format called Single-File Component (also known as *.vue files, abbreviated as SFC). A Vue SFC, as the name suggests, encapsulates the component's logic (JavaScript), template (HTML), and styles (CSS) in a single file. Here's the previous example, written in SFC format:

```
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```