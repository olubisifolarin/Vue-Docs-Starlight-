---
title: Testing
description: Testing
---

### Why Test?​
Automated tests help you and your team build complex Vue applications quickly and confidently by preventing regressions and encouraging you to break apart your application into testable functions, modules, classes, and components. As with any application, your new Vue app can break in many ways, and it's important that you can catch these issues and fix them before releasing.

In this guide, we'll cover basic terminology and provide our recommendations on which tools to choose for your Vue 3 application.

There is one Vue-specific section covering composables. See [Testing Composables]() below for more details.

#### When to Test​
Start testing early! We recommend you begin writing tests as soon as you can. The longer you wait to add tests to your application, the more dependencies your application will have, and the harder it will be to start.

### Testing Types​
When designing your Vue application's testing strategy, you should leverage the following testing types:

- Unit: Checks that inputs to a given function, class, or composable are producing the expected output or side effects.
Component: Checks that your component mounts, renders, can be interacted with, and behaves as expected. These tests import more code than unit tests, are more complex, and require more time to execute.
- End-to-end: Checks features that span multiple pages and makes real network requests against your production-built Vue application. These tests often involve standing up a database or other backend.
- Each testing type plays a role in your application's testing strategy, and each will protect you against different types of issues.

### Overview​
We will briefly discuss what each of these are, how they can be implemented for Vue applications, and provide some general recommendations.