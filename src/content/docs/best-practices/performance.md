---
title: Performance
description: Performance
---

### Overview​
Vue is designed to be performant for most common use cases without much need for manual optimizations. However, there are always challenging scenarios where extra fine-tuning is needed. In this section, we will discuss what you should pay attention to when it comes to performance in a Vue application.

First, let's discuss the two major aspects of web performance:

- Page Load Performance: how fast the application shows content and becomes interactive on the initial visit. This is usually measured using web vital metrics like [Largest Contentful Paint (LCP)](https://web.dev/articles/lcp) and [Interaction to Next Paint](https://web.dev/articles/inp).

- Update Performance: how fast the application updates in response to user input. For example, how fast a list updates when the user types in a search box, or how fast the page switches when the user clicks a navigation link in a Single-Page Application (SPA).

While it would be ideal to maximize both, different frontend architectures tend to affect how easy it is to attain desired performance in these aspects. In addition, the type of application you are building greatly influences what you should prioritize in terms of performance. Therefore, the first step of ensuring optimal performance is picking the right architecture for the type of application you are building:

- Consult [Ways of Using Vue]() to see how you can leverage Vue in different ways.

- Jason Miller discusses the types of web applications and their respective ideal implementation / delivery in [Application Holotypes](https://jasonformat.com/application-holotypes/).

### Profiling Options​
To improve performance, we need to first know how to measure it. There are a number of great tools that can help in this regard:

For profiling load performance of production deployments:

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
For profiling performance during local development:

- [Chrome DevTools Performance Panel](https://developer.chrome.com/docs/devtools/performance)
    - `app.config.performance` enables Vue-specific performance markers in Chrome DevTools' performance timeline.
- [Vue DevTools Extension]() also provides a performance profiling feature.

### Page Load Optimizations​
There are many framework-agnostic aspects for optimizing page load performance - [check out this web.dev guide](https://web.dev/explore/fast) for a comprehensive round up. Here, we will primarily focus on techniques that are specific to Vue.

Choosing the Right Architecture​
If your use case is sensitive to page load performance, avoid shipping it as a pure client-side SPA. You want your server to be directly sending HTML containing the content the users want to see. Pure client-side rendering suffers from slow time-to-content. This can be mitigated with [Server-Side Rendering (SSR)]() or [Static Site Generation (SSG)](). Check out the SSR Guide to learn about performing SSR with Vue. If your app doesn't have rich interactivity requirements, you can also use a traditional backend server to render the HTML and enhance it with Vue on the client.

If your main application has to be an SPA, but has marketing pages (landing, about, blog), ship them separately! Your marketing pages should ideally be deployed as static HTML with minimal JS, by using SSG.

