---
title: Ways of Using Vue
description: Ways of Using Vue
---

We believe there is no "one size fits all" story for the web. This is why Vue is designed to be flexible and incrementally adoptable. Depending on your use case, Vue can be used in different ways to strike the optimal balance between stack complexity, developer experience and end performance.

### Standalone 

Vue can be used as a standalone script file - no build step required! If you have a backend framework already rendering most of the HTML, or your frontend logic isn't complex enough to justify a build step, this is the easiest way to integrate Vue into your stack. You can think of Vue as a more declarative replacement of jQuery in such cases.

Vue also provides an alternative distribution called [petite-vue](https://github.com/vuejs/petite-vue) that is specifically optimized for progressively enhancing existing HTML. It has a smaller feature set, but is extremely lightweight and uses an implementation that is more efficient in no-build-step scenarios.

### Embedded Web Components​

You can use Vue to [build standard Web Components]() that can be embedded in any HTML page, regardless of how they are rendered. This option allows you to leverage Vue in a completely consumer-agnostic fashion: the resulting web components can be embedded in legacy applications, static HTML, or even applications built with other frameworks.

### Single-Page Application (SPA)​
Some applications require rich interactivity, deep session depth, and non-trivial stateful logic on the frontend. The best way to build such applications is to use an architecture where Vue not only controls the entire page, but also handles data updates and navigation without having to reload the page. This type of application is typically referred to as a Single-Page Application (SPA).

Vue provides core libraries and [comprehensive tooling support](/Vue-Docs-Starlight-/scaling-up/tooling/) with amazing developer experience for building modern SPAs, including:

- Client-side router
- Blazing fast build tool chain
- IDE support
- Browser devtools
- TypeScript integrations
- Testing utilities

SPAs typically require the backend to expose API endpoints - but you can also pair Vue with solutions like Inertia.js to get the SPA benefits while retaining a server-centric development model.