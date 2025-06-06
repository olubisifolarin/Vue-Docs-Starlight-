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

### Unit Testing​
Unit tests are written to verify that small, isolated units of code are working as expected. A unit test usually covers a single function, class, composable, or module. Unit tests focus on logical correctness and only concern themselves with a small portion of the application's overall functionality. They may mock large parts of your application's environment (e.g. initial state, complex classes, 3rd party modules, and network requests).

In general, unit tests will catch issues with a function's business logic and logical correctness.

Take for example this 'increment' function:

```
// helpers.js
export function increment(current, max = 10) {
  if (current < max) {
    return current + 1
  }
  return current
}
```

Because it's very self-contained, it'll be easy to invoke the increment function and assert that it returns what it's supposed to, so we'll write a Unit Test.

If any of these assertions fail, it's clear that the issue is contained within the increment function.

```
// helpers.spec.js
import { increment } from './helpers'

describe('increment', () => {
  test('increments the current number by 1', () => {
    expect(increment(0, 10)).toBe(1)
  })

  test('does not increment the current number over the max', () => {
    expect(increment(10, 10)).toBe(10)
  })

  test('has a default max of 10', () => {
    expect(increment(10)).toBe(10)
  })
})
```

As mentioned previously, unit testing is typically applied to self-contained business logic, components, classes, modules, or functions that do not involve UI rendering, network requests, or other environmental concerns.

These are typically plain JavaScript / TypeScript modules unrelated to Vue. In general, writing unit tests for business logic in Vue applications does not differ significantly from applications using other frameworks.

There are two instances where you DO unit test Vue-specific features:

1. Composables
2. Components

#### Composables​
One category of functions specific to Vue applications is [Composables](/Vue-Docs-Starlight-/resueable/composables), which may require special handling during tests. See [Testing Composables]() below for more details.

#### Unit Testing Components​
A component can be tested in two ways:

1. Whitebox: Unit Testing

Tests that are "Whitebox tests" are aware of the implementation details and dependencies of a component. They are focused on **isolating** the component under test. These tests will usually involve mocking some, if not all of your component's children, as well as setting up plugin state and dependencies (e.g. Pinia).

2. Blackbox: Component Testing

Tests that are "Blackbox tests" are unaware of the implementation details of a component. These tests mock as little as possible to test the integration of your component and the entire system. They usually render all child components and are considered more of an "integration test". See the [Component Testing recommendations]() below.

#### Recommendation​
- [Vitest](https://vitest.dev/)

Since the official setup created by 'create-vue' is based on [Vite](https://vite.dev/), we recommend using a unit testing framework that can leverage the same configuration and transform pipeline directly from Vite. [Vitest](https://vitest.dev/) is a unit testing framework designed specifically for this purpose, created and maintained by Vue / Vite team members. It integrates with Vite-based projects with minimal effort, and is blazing fast.

#### Other Options​
- [Jest](https://jestjs.io/) is a popular unit testing framework. However, we only recommend Jest if you have an existing Jest test suite that needs to be migrated over to a Vite-based project, as Vitest offers a more seamless integration and better performance.

### Component Testing​
In Vue applications, components are the main building blocks of the UI. Components are therefore the natural unit of isolation when it comes to validating your application's behavior. From a granularity perspective, component testing sits somewhere above unit testing and can be considered a form of integration testing. Much of your Vue Application should be covered by a component test and we recommend that each Vue component has its own spec file.

Component tests should catch issues relating to your component's props, events, slots that it provides, styles, classes, lifecycle hooks, and more.

Component tests should not mock child components, but instead test the interactions between your component and its children by interacting with the components as a user would. For example, a component test should click on an element like a user would instead of programmatically interacting with the component.

Component tests should focus on the component's public interfaces rather than internal implementation details. For most components, the public interface is limited to: events emitted, props, and slots. When testing, remember to **test what a component does**, not how it does it.

**DO**

- For **Visual** logic: assert correct render output based on inputted props and slots.

- For **Behavioral** logic: assert correct render updates or emitted events in response to user input events.

In the below example, we demonstrate a Stepper component that has a DOM element labeled "increment" and can be clicked. We pass a prop called `max` that prevents the Stepper from being incremented past `2`, so if we click the button 3 times, the UI should still say `2`.

We know nothing about the implementation of Stepper, only that the "input" is the `max` prop and the "output" is the state of the DOM as the user will see it.

```
const valueSelector = '[data-testid=stepper-value]'
const buttonSelector = '[data-testid=increment]'

mount(Stepper, {
  props: {
    max: 1
  }
})

cy.get(valueSelector)
  .should('be.visible')
  .and('contain.text', '0')
  .get(buttonSelector)
  .click()
  .get(valueSelector)
  .should('contain.text', '1')
```

DON'T

- Don't assert the private state of a component instance or test the private methods of a component. Testing implementation details makes the tests brittle, as they are more likely to break and require updates when the implementation changes.

The component's ultimate job is rendering the correct DOM output, so tests focusing on the DOM output provide the same level of correctness assurance (if not more) while being more robust and resilient to change.

Don't rely exclusively on snapshot tests. Asserting HTML strings does not describe correctness. Write tests with intentionality.

If a method needs to be tested thoroughly, consider extracting it into a standalone utility function and write a dedicated unit test for it. If it cannot be extracted cleanly, it may be tested as a part of a component, integration, or end-to-end test that covers it.

#### Recommendation​
[Vitest](https://vitest.dev/) for components or composables that render headlessly (e.g. the `useFavicon` function in VueUse). Components and DOM can be tested using `@vue/test-utils`.

[Cypress Component Testing](https://docs.cypress.io/app/component-testing/get-started) for components whose expected behavior depends on properly rendering styles or triggering native DOM events. It can be used with Testing Library via [@testing-library/cypress](https://testing-library.com/docs/cypress-testing-library/intro/x).

The main differences between Vitest and browser-based runners are speed and execution context. In short, browser-based runners, like Cypress, can catch issues that node-based runners, like Vitest, cannot (e.g. style issues, real native DOM events, cookies, local storage, and network failures), but browser-based runners are orders of magnitude slower than Vitest because they do open a browser, compile your stylesheets, and more. Cypress is a browser-based runner that supports component testing. Please read [Vitest's comparison page](https://vitest.dev/guide/comparisons.html#cypress) for the latest information comparing Vitest and Cypress.

#### Mounting Libraries​
Component testing often involves mounting the component being tested in isolation, triggering simulated user input events, and asserting on the rendered DOM output. There are dedicated utility libraries that make these tasks simpler.

- `@vue/test-utils` is the official low-level component testing library that was written to provide users access to Vue specific APIs. It's also the lower-level library `@testing-library/vue` is built on top of.

- `@testing-library/vue` is a Vue testing library focused on testing components without relying on implementation details. Its guiding principle is that the more tests resemble the way software is used, the more confidence they can provide.

We recommend using `@vue/test-utils` for testing components in applications. `@testing-library/vue` has issues with testing asynchronous component with Suspense, so it should be used with caution.

#### Other Options​
- [Nightwatch](https://nightwatchjs.org/) is an E2E test runner with Vue Component Testing support. [(Example Project)](https://github.com/nightwatchjs-community/todo-vue)

- [WebdriverIO](https://webdriver.io/docs/component-testing/vue/) for cross-browser component testing that relies on native user interaction based on standardized automation. It can also be used with Testing Library.