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